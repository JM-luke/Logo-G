const express = require('express');
const router = express.Router();
const registerCtrl = require('../controllers/register.controller');

router.post('/', registerCtrl.registerUser);

module.exports = router;