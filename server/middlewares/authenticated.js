// const jwt = require('jwt-simple');
// const moment = require('moment');
// const config = require('../config.json');


// exports.ensureAuth = function(req, res, next){

// 	let token;
// 	let payload;

// 	if(!req.headers.authorization){
// 		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
// 	}
// 	token = req.headers.authorization.replace(/['"]+/g, '');
// 	try{
// 		payload = jwt.decode(token, config.secret);
// 		if(payload.exp <= moment().unix()){
// 			return res.status(401).send({
// 				message: 'El token ha expirado'
// 			});
// 		}
// 	}catch(ex){
// 		return res.status(404).send({
// 			message: 'El token no es válido'
// 		});
// 	}
// 	req.user = payload;
// 	next();
// };



// const expressJwt = require('express-jwt');
// const config = require('../config.json');
// const userService = require('../services/user.service');

// module.exports = jwt;

// function jwt() {
//     const secret = config.secret;
//     return expressJwt({ secret, isRevoked }).unless({
//         path: [
//             // public routes that don't require authentication
//             '/login',
//             '/register'
//         ]
//     });
// }

// async function isRevoked(req, payload, done) {
//     const user = await userService.getById(payload.sub);

//     // revoke token if user no longer exists
//     if (!user) {
//         return done(null, true);
//     }

//     done();
// };