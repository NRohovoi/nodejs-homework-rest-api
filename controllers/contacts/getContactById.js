const contactOperations = require('../../models/contacts');
const {NotFound} = require('http-errors');

const getContactById = async (req, res, next) => {
    try {
      const {contactId} = await req.params;
      const contact = await contactOperations.getContactById(contactId);
      
      if(!contact){
        throw new NotFound('Not found');
      }

      res.json({
      status: 'success',
      code: 200,
      data: {
        contact,
      },
      });
    } catch (error){
      next(error);
    };
  };

  module.exports = getContactById;