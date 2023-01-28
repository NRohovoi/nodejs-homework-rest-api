const {BadRequest} = require('http-errors');

const {model: srvc} = require('../../service');
const sendMsg = require('../../helpers/sendMsg');

const resendingMsg = async (req, res, next) => {
	try{
		const {email} = req.body;

		if(!email) {
			throw new BadRequest('missing required field email');
		};
		const user = await srvc.authModel.User.findOne({email});

		const {verify, verificationToken} = user;

		if(verify === true && verificationToken === null){
			throw new BadRequest('Verification has already been passed');
		};

		await sendMsg(email, verificationToken);

		res.json({
			message: 'Verification email sent'
		})
	} catch (error) {
		next(error)
	};
};

module.exports = resendingMsg;