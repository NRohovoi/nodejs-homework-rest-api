const {model: srvc} = require('../../service');

const logout = async (req, res, next) => {
	const {_id} = req.user;
	await srvc.authModel.User.findByIdAndUpdate(_id, {token: null});
	res.status(204).json();
};

module.exports = logout;