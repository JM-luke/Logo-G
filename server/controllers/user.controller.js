const userCtrl = {};
const User = require('../models/user.model');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(req.params.id);
    res.json(user);
};

userCtrl.createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ status: 'User saved' });

};

userCtrl.editUser = async (req, res) => {
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

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ status: 'User deleted' });
};

module.exports = userCtrl;