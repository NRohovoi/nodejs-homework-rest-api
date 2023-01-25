const {model: srvc} = require('../../service');
const {BadRequest, Unauthorized} = require('http-errors');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;

const login = async (req, res, next) => {
  try {
    const {error} = await srvc.authModel.joiSchema.validate(req.body);
    
    if(error){
      throw new BadRequest('missing fields');
    }

    const {email, password} = req.body;
    const user = await srvc.authModel.User.findOne({email});

    if(!user || !user.comparePassword(password)){
      throw new Unauthorized('Email or password is wrong');
    };

		const payload = {
			id: user._id
		};

		const token = jwt.sign(payload, SECRET_KEY);
    await srvc.authModel.User.findByIdAndUpdate(user._id, {token});

    res.json({
			status: 'success',
			code: 200,
			data: {
				token
			}
  	});
  } catch (error) {
    next(error);
  };
};

module.exports = login;