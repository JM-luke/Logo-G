const loginService = require('../services/login.service');

module.exports = {
  loginUser : loginUser
};

function loginUser(req, res, next) {
  
  loginService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}


    
    // const { email } = req.body; 
    // const { password } = req.body;
    
    
    // if(email && password){

    //   await User.findOne({ email: email.toLowerCase() }, (err, user) => {
    //       if(err){
    //           res.json({ status: 'Server Error'});
    //       }else{
    //           if(user){
    //             bcrypt.compare(password, user.password, (err, check) => {
    //               if(check){
    //                 const token = jwt.createToken(user);
    //                 let user_logged = {};
    //                 user_logged.user = user;
    //                 user_logged.user.password = undefined;
    //                 user_logged.token = token;
    //                 console.log(user_logged);
    //                 res.json({ user_logged });
    //               }else{
    //                 console.log('NO CHECK');
    //                 res.json({ status: 'You are not logged in'});
    //               }
    //             });
    //           }else{
    //               res.json({ status: 'You are not logged in'});
    //           }
    //       }
    //   });
    // }
    

