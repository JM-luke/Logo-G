const registerCtrl = {};
const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');

registerCtrl.registerUser = async (req, res) => {
    console.log('Controller register');
    const { email } = req.body; 
    const { password } = req.body;
    await User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if(err){
            res.json({ status: 'Server Error'});
        }else{
            if(user){
                
            }else{
                
            }
        }
    });
};
module.exports = registerCtrl;