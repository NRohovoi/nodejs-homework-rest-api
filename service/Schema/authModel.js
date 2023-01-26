const {model, Schema} = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  avatarURL: String,
  token: String
});

const joiSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ca', 'uk', 'org'] } }),
	subscription: Joi.string().default('starter'),
	token: Joi.string(),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business").required(),
});

userSchema.methods.setPassword = function(password){
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

const User = model("user", userSchema);

module.exports = {
	User,
	joiSchema,
  subscriptionJoiSchema
};