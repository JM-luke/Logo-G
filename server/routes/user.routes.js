const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');
const md_auth = require('../middlewares/authenticated'); 
const md_admin = require('../middlewares/is_admin');


router.get('/', [md_auth.ensureAuth, md_admin.isAdmin], usersCtrl.getUsers);
router.post('/', [md_auth.ensureAuth, md_admin.isAdmin], usersCtrl.createUser);
router.get('/:id', md_auth.ensureAuth, usersCtrl.getUser);
router.put('/:id', [md_auth.ensureAuth, md_admin.isAdmin], usersCtrl.editUser);
router.delete('/:id', [md_auth.ensureAuth, md_admin.isAdmin], usersCtrl.deleteUser);


module.exports = router;