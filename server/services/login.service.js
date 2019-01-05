const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require('../config.json');

module.exports = {
  authenticate
}

async function authenticate({ email, password }) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
          ...userWithoutHash,
          token
      };
  }
}


  // const { email } = req.body; 
  //   const { password } = req.body;

  //   if(email && password){

  //     await User.findOne({ email: email.toLowerCase() }, (err, user) => {
  //         if(err){
  //             res.json({ status: 'Server Error'});
  //         }else{
  //             if(user){
  //               bcrypt.compare(password, user.password, (err, check) => {
  //                 if(check){
  //                   const token = jwt.createToken(user);
  //                   let user_logged = {};
  //                   user_logged.user = user;
  //                   user_logged.user.password = undefined;
  //                   user_logged.token = token;
  //                   console.log(user_logged);
  //                   res.json({ user_logged });
  //                 }else{
  //                   console.log('NO CHECK');
  //                   res.json({ status: 'You are not logged in'});
  //                 }
  //               });
  //             }else{
  //                 res.json({ status: 'You are not logged in'});
  //             }
  //         }
  //     });
  //   }  
//}