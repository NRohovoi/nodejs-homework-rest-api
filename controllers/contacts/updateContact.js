const {model: srvc} = require('../../service');
const {BadRequest, NotFound} = require('http-errors');

const updateContact = async (req, res, next) => {
    try {
      const {error} = await srvc.contactModel.joiSchema.validate(req.body);
      
      if(error){
        throw new BadRequest('missing fields');
      }
      const {contactId} = await req.params;
      const updatedContact = await srvc.contactModel
      .Contact.findByIdAndUpdate(contactId, req.body, {new: true})
      .populate('owner', '_id email');

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