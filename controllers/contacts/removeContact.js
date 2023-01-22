const contactOperations = require('../../models/contacts');
const {NotFound} = require('http-errors');

const removeContact = async (req, res, next) => {
    try {
      const {contactId} = await req.params;
      const deletedContact = await contactOperations.removeContact(contactId);
      
      if(!deletedContact){
        throw new NotFound('Not found');
      };
      
      res.json({
        status: 'success',
        code: 200,
        data: {
          deletedContact,
        },
        message: "contact deleted",
      });
    } catch (error) {
      next(error);
    };
  };

  module.exports = removeContact;