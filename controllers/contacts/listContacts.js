const contactOperations = require('../../models/contacts');

const listContacts = async (req, res, next) => {
    try {
      const contacts = await contactOperations.listContacts();
      
      res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
      });
    } catch (error) {
      next(error);
    };
  };

  module.exports = listContacts;