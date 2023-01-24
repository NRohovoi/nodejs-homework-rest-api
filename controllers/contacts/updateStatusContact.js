const {Contact, statusJoiSchema} = require('../../mongodb/model');
const {BadRequest, NotFound} = require('http-errors');

const updateStatusContact = async (req, res, next) => {
    try {
      const {error} = await statusJoiSchema.validate(req.body);
      
      if(error){
        throw new BadRequest('missing field favorite');
      }

      const {contactId} = await req.params;
			const {favorite} = req.body;
      const updatedContact = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
      
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

  module.exports = updateStatusContact;