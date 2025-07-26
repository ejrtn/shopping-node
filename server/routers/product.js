const express = require('express');
const router = express.Router();
const service = require('../service/productService')

router.post('/productSave', (req, res) => {
    service.productSave(req.data)
});

router.post('/productList', (req, res) => {
    service.productList(req.data)
});

router.post('/productDelete', (req, res) => {
    service.productDelete(req.data)
});

router.post('/productUpdate', (req, res) => {
    service.productUpdate(req.data)
}); 

router.post('/getProduct', (req, res) => {
    service.getProduct(req,res)
});

router.post('/imgLoad', (req, res) => {
    service.imgLoad(req.data)
});

router.post('/listAll', (req, res) => {
    service.productSave(req.data)
});

router.get('/top10', (req, res) => {
    service.top10(req,res)
});

module.exports = router