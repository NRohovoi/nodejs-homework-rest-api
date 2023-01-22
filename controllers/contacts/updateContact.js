const contactOperations = require('../../models/contacts');
const {BadRequest} = require('http-errors');
const {NotFound} = require('http-errors');
const contactSchema = require('./validate');

const updateContact = async (req, res, next) => {
    try {
      const {error} = await contactSchema.validate(req.body);
      
      if(error){
        throw new BadRequest('missing fields');
      }

      const {contactId} = await req.params;
      const updatedContact = await contactOperations.updateContact(contactId, req.body);
      
      if(!updatedContact){
        throw new NotFound('Not found');
      };

      res.json({
      status: 'success',
      code: 200,
      data: {
        updatedContact,
      }
    });
    } catch (error) {
      next(error);
    };
  };

  module.exports = updateContact;