const usersCtrl = {};
const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

usersCtrl.createUser = async (req, res) => {
    // Usuario creado por admin
    const user = new User(req.body);
    if(user.nombre && user.apellidos && user.email && user.password && user.role){
      try {
        // Comprobar si no existe el usuario
        const isSetUSser = await User.findOne({ email: user.email.toLowerCase()});    
        if(!isSetUSser){
          // Encriptar password
          const hash =  bcrypt.hash(user.password, null, null, (err, hash) => {
            if(err){
              res.json({message: 'Server Error'});
            }else{
              user.password = hash;
              user.save()
                .then(function(userStored){
                  console.log(userStored);
                  res.json({user: userStored});
                })
                .catch(function(error){
                  res.json({message: 'Server Error'});
              });
            }
          });

        }else{
          res.json({message: 'User Error'});
        }
      } catch (error) {
          res.json({message: 'Server Error'});
      }
    }
    

};

usersCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password
    }
    await User.findByIdAndUpdate(id, { $set: user }, { new: true });
    res.json({ status: 'User updated' });
};

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ status: 'User deleted' });
};

module.exports = usersCtrl;