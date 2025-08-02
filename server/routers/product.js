const express = require('express');
const router = express.Router();
const service = require('../service/productService')

router.post('/productSave',async (req, res) => {
    res.send(await service.productSave(req.body))
});

router.post('/productList',async (req, res) => {
    res.send(await service.productList(req.body))
});

router.post('/productDelete',async (req, res) => {
    res.send(await service.productDelete(req.body))
});

router.post('/productUpdate',async (req, res) => {
    res.send(await service.productUpdate(req.body))
}); 

router.post('/getProduct',async (req, res) => {
    res.send(await service.getProduct(req.body))
});

router.post('/imgLoad',async (req, res) => {
    res.send(await service.imgLoad(req.body))
});

router.post('/listAll',async (req, res) => {
    res.send(await service.listAll(req.body))
});

router.get('/top10',async (req, res) => {
    res.send(await service.top10(req.body))
});

module.exports = router