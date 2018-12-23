const express = require('express');
const router = express.Router();
const dataLogo = require('../dataLogo');
const md_auth = require('../middlewares/authenticated');

router.get('/',md_auth.ensureAuth,(req, res) => {
    res.json(dataLogo.logoPositions);
});

module.exports = router;