const {NotFound} = require('http-errors');

const {model: srvc} = require('../../service');

const verificationToken = async (req, res) => {
	const {verificationToken} = req.params;
	
	const user = await srvc.authModel.User.findOne({verificationToken});
	
	if(!user){
		throw NotFound('User not found');
	};
	
	await srvc.authModel.User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null})

	res.json({
		message: 'Verification successful'
	})
};

module.exports = verificationToken;