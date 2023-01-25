const {model: srvc} = require('../../service');
const {NotFound} = require('http-errors');

const getContactById = async (req, res, next) => {
    try {
      const {contactId} = await req.params;
      const contact = await srvc.contactModel.Contact.findById(contactId).populate('owner', '_id email');
      
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