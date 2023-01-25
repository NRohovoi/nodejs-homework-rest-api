const {model: srvc} = require('../../service');
const {BadRequest, NotFound} = require('http-errors');

const updateSubscription = async (req, res, next) => {
try {
	const {error} = await srvc.authModel.subscriptionJoiSchema.validate(req.body);
      
  if(error){
    throw new BadRequest('missing field subscription');
  }
 
	const {subscription} = req.body;
  const {_id, email} = req.user;

  const updatedStatusSubscription = await srvc.authModel.User.findByIdAndUpdate(_id, {subscription}, {new: true});
      
  if(!updatedStatusSubscription){
    throw new NotFound('Not found');
  };

	res.json({
		status: 'success',
      code: 200,
      data: {
        email,
				subscription
			},
		});

} catch (error){
	next(error);
}
};

module.exports = updateSubscription;