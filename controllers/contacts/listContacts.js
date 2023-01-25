const {model: srvc} = require('../../service');

const listContacts = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const {page = 1, limit = 5, favorite} = req.query;
    const skip = (page - 1) * limit;
    const allContacts = await srvc.contactModel.Contact.find({owner: _id}, '', {skip, limit: +limit})
    .populate('owner', '_id email');

    if(!favorite){
    return  res.json({
    status: 'success',
        code: 200,
        data: {
          allContacts,
        },
      });
    };
    const contactsByFavorite = await srvc.contactModel.Contact.find({owner: _id}, '', {skip, limit: +limit})
    .populate('owner', '_id email').where({favorite});
    
    res.json({
      status: 'success',
      code: 200,
      data: {
        contactsByFavorite,
      },
    });
  } catch (error) {
    next(error);
  }; 
};

  module.exports = listContacts;