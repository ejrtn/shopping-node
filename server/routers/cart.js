const express = require('express');
const router = express.Router();
const service = require('../service/cartService')

router.post('/cartSave', async(req, res) => {
    res.send(await service.cartSave(req.body))
});

router.post('/cartList', async(req, res) => {
    res.send(await service.cartList(req.body))
});

router.post('/cartDelete', async(req, res) => {
    res.send(await service.cartDelete(req.data))
});

router.post('/tmpCartSave', async(req, res) => {
    res.send(await service.tmpCartSave(req.data))
});

router.post('/tmpCartDelete', async(req, res) => {
    res.send(await service.tmpCartDelete(req.data))
});

router.get('/tmpCartList/:keyData', async(req, res) => {
    d = await service.tmpCartList(req.params)
    res.send(d)
});

module.exports = router