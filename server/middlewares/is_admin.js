const Role = require('../models/role');
exports.isAdmin = function(req, res, next){
	if(req.user.role != Role.Admin){
		return res.status(401).send({message: 'Unauthorised'});
	}
	next();
};