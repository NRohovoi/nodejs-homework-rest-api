const { model: srvc } = require('../../service');
const { BadRequest, Conflict } = require('http-errors');
const sendMsg = require('../../helpers/sendMsg');
const {v4: uuidv4} = require('uuid');
const gravatar = require('gravatar');

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
      
      const avatarURL = gravatar.url(email);
      const verificationToken = uuidv4();
      const newUser = new srvc.authModel.User({email, password, avatarURL, verificationToken});
      newUser.setPassword(password);
      await newUser.save();
      await sendMsg(email, verificationToken);

      res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          password,
          avatarURL
        }
      }
    });
    } catch (error) {
      next(error);
    };
  };

  module.exports = register;