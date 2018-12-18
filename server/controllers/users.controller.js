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
    if(user.name && user.apellidos && user.email && user.password && user.role){
      // Comprobar si ya existe el usuario
      try {
        const isSetUser = await User.findOne({ email: user.email.toLowerCase()});
      } catch (error) {
        res.json({status: 'Server error'});
      }
      if(!isSetUser){
        // Encriptar password
        const hash = await bcrypt.hash(user.password, null);
        user.password = hash;
        await user.save();
        res.json({ status: 'User saved' });
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