const {Contact, joiSchema} = require('../../mongodb/model');
const {BadRequest} = require('http-errors');

const addContact = async (req, res, next) => {
    try {
      const {error} = await joiSchema.validate(req.body);

      if(error){
        throw new BadRequest('missing required name field');
      }
      const newContact = await Contact.create(req.body);
      
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