const express = require('express');
const router = express.Router();
const dataLogo = require('../dataLogo');

router.get('/',(req, res) => {
    res.json(dataLogo.logoPositions);
});

module.exports = router;