// const registerCtrl = {};
// const User = require('../models/user.model');
// const bcrypt = require('bcrypt-nodejs');

// registerCtrl.registerUser = async (req, res) => {
//     console.log('Controller register');
//     const { email } = req.body; 
//     const { password } = req.body;
//     await User.findOne({ email: email.toLowerCase() }, (err, user) => {
//         if(err){
//             res.json({ status: 'Server Error'});
//         }else{
//             if(user){
//                 console.log('user encontrado');
//             }else{
//                 console.log('user NO encontrado');
//                 // Cifrar contraseña
// 					bcrypt.hash(params.password, null, null, function(err, hash){
//                         user.password = hash;
//                     });

//             }
//         }
//     });
// };
// module.exports = registerCtrl;