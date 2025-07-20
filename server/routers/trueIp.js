const express = require('express');
const router = express.Router();
const service = require('../service/ipService')

router.post('/ipSave', (req, res) => {
    service.ipSave(res.data)
});

router.post('/ipCheck', (req, res) => {
    service.productUpdate(res.data)
}); 

router.post('/ipList', (req, res) => {
    service.productList(res.data)
});

router.post('/ipDelete', (req, res) => {
    service.productDelete(res.data)
});

router.post('/ipUpdate', (req, res) => {
    service.productUpdate(res.data)
}); 

module.exports = router