const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');

router.get('/', usersCtrl.getUsers);
router.post('/', usersCtrl.createUser);
router.get('/:id', usersCtrl.getUser);
router.put('/:id', usersCtrl.editUser);
router.delete('/:id', usersCtrl.deleteUser);


module.exports = router;