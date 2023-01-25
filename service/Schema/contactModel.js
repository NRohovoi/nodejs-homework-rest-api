const {model, Schema} = require('mongoose');
const Joi = require('joi');

const phoneRegexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  }, {versionKey: false, timestamps: true});

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ca', 'uk', 'org'] } }),
    phone: Joi.string().pattern(phoneRegexp),
    favorite: Joi.bool(),
  });

  const statusJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
  });

const Contact = model('contact', contactSchema);

module.exports = {
	Contact,
  joiSchema,
  statusJoiSchema,
};