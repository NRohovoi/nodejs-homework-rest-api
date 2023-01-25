const {model: srvc} = require('../../service');
const {BadRequest, Conflict} = require('http-errors');

const register = async (req, res, next) => {
    try {
      const {error} = await srvc.authModel.joiSchema.validate(req.body);
      
      if(error){
        throw new BadRequest('missing fields');
      }

      const {email, password} = req.body;
      const userEmail = await srvc.authModel.User.findOne({email});
      if(userEmail){
        throw new Conflict('Email in use');
      };
    
      const newUser = new srvc.authModel.User({email, password});
      newUser.setPassword(password);
      newUser.save();
      
      res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          password
        }
      }
    });
    } catch (error) {
      next(error);
    };
  };

  module.exports = register;