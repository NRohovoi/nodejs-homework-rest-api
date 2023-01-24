const {Contact, joiSchema} = require('../../mongodb/model');
const {BadRequest, NotFound} = require('http-errors');

const updateContact = async (req, res, next) => {
    try {
      const {error} = await joiSchema.validate(req.body);
      
      if(error){
        throw new BadRequest('missing fields');
      }

      const {contactId} = await req.params;
      const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

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