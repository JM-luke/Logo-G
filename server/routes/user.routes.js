const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');
// const md_auth = require('../middlewares/authenticated'); 
// const md_admin = require('../middlewares/is_admin');

router.get('/', usersCtrl.getUsers);
router.post('/', usersCtrl.createUser);
router.get('/:id', usersCtrl.getUser);
router.put('/:id', usersCtrl.editUser);
router.delete('/:id', usersCtrl.deleteUser);

module.exports = router;