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
    // Usuario creado desde panel admin
    const user = new User(req.body);
    console.log(user);
    try {
      if(!user.nombre || !user.apellidos || !user.email || !user.password ){
        throw new Error('server error'); 
      }
      user.email = user.email.toLowerCase();
      // Comprobar si no existe el usuario
      const isSetUSser = await User.findOne({ email: user.email});
      if(isSetUSser) throw new Error('User already exists'); 

      //bcrypt.hash does not return a promise. wraps bcrypt in a promise in order to use await.
      const hash = await new Promise((resolve, reject) => {
        // Encriptar password
        bcrypt.hash(user.password, null, null, (err, hash) =>{
          if(err) reject()
          resolve(hash);
        });
      });
      user.password = hash;
      const userStored = await user.save();
      console.log(userStored);
      res.json({user: userStored});
    } catch (error) {
      console.error(error);
        if(error.message !== 'User already exists') error.message = 'Server error'
        res.json({message: error.message});
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

usersCtrl.loginUser = async (req, res) => {
  console.log('login user');
};

module.exports = usersCtrl;