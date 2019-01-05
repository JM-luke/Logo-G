const Role = require('../models/role');
exports.isController = function(req, res, next){
	if(req.user.role != Role.Controller){
		return res.status(401).send({message: 'Unauthorised'});
	}
	next();
};