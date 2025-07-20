const express = require('express');
const router = express.Router();
const service = require('../service/cartService')

router.post('/cartSave', (req, res) => {
    res.send(service.cartSave(req.data))
});

router.post('/cartList', (req, res) => {
    res.send(service.cartList(req.data))
});

router.post('/cartDelete', (req, res) => {
    res.send(service.cartDelete(req.data))
});

router.post('/tmpCartSave', (req, res) => {
    res.send(service.tmpCartSave(req.data))
});

router.post('/tmpCartDelete', (req, res) => {
    res.send(service.tmpCartDelete(req.data))
});

router.get('/tmpCartList/:keyData', async(req, res) => {
    d = await service.tmpCartList(req.params)
    res.send(d)
});

module.exports = router