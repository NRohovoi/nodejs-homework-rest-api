const {model: srvc} = require('../../service');
const {BadRequest} = require('http-errors');

const addContact = async (req, res, next) => {
    try {
      const {error} = await srvc.contactModel.joiSchema.validate(req.body);

      if(error){
        throw new BadRequest('missing required name field');
      }

      const {_id} = req.user;
      const newContact = await srvc.contactModel.Contact.create({...req.body, owner: _id});
      
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