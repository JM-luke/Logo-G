const loginCtrl = {};
const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require ('../services/jwt');

loginCtrl.loginUser = async (req, res) => {
    
    const { email } = req.body; 
    const { password } = req.body;
    const { getToken } = req.body;
    
    
    await User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if(err){
            res.json({ status: 'Server Error'});
        }else{
            if(user){
              let token = jwt.createToken(user);
              console.log('Token' +token);
                bcrypt.compare(password, user.password, (err, check) => {
                  if(check){
                      if(getToken){
                        //devolver token jwt
                        
                        res.json({ token });
                      }else{
                          res.json({ user });
                      }
                  }else{
                      res.json({ status: 'You are not logged in'});
                  }
                });
            }else{
                res.json({ status: 'You are not logged in'});
            }
        }
    });
};
module.exports = loginCtrl;