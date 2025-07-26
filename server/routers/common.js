const express = require('express');
const router = express.Router();
const service = require('../service/common')

router.get('/imgLoad', (req, res) => {
    service.imgLoad(req,res)
});

module.exports = router