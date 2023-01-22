const contactOperations = require('../../models/contacts');
const {BadRequest} = require('http-errors');

const contactSchema = require('./validate');

const addContact = async (req, res, next) => {
    try {
      const {error} = await contactSchema.validate(req.body);
      
      if(error){
        throw new BadRequest('missing required name field');
      }
      const newContact = await contactOperations.addContact(req.body);
      
      res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newContact,
      }
    });
    } catch (error) {
      next(error);
    };
  };

  module.exports = addContact;