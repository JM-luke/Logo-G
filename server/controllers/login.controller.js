const loginCtrl = {};
const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');

loginCtrl.loginUser = async (req, res) => {
    
    const { email } = req.body; 
    const { password } = req.body;

    await User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if(err){
            res.json({ status: 'Server Error'});
        }else{
            if(user){
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){
                        res.json({ user });
                        // if(params.gettoken){
                        //     //devolver token jwt
                        //     res.status(200).send({
                        //         token: jwt.createToken(user)
                        //     });
                        // }else{
                        //     res.status(200).send({user});
                        // }
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