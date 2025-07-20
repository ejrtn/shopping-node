const express = require('express');
const router = express.Router();
const service = require('../service/ipService')

router.post('/ipSave', (req, res) => {
    service.ipSave(req.data)
});

router.post('/ipCheck', (req, res) => {
    service.productUpdate(req.data)
}); 

router.post('/ipList', (req, res) => {
    service.productList(req.data)
});

router.post('/ipDelete', (req, res) => {
    service.productDelete(req.data)
});

router.post('/ipUpdate', (req, res) => {
    service.productUpdate(req.data)
}); 

module.exports = router