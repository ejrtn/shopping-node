const express = require('express');
const router = express.Router();
const service = require('../service/productService')

router.post('/productSave', (req, res) => {
    service.productSave(res.data)
});

router.post('/productList', (req, res) => {
    service.productList(res.data)
});

router.post('/productDelete', (req, res) => {
    service.productDelete(res.data)
});

router.post('/productUpdate', (req, res) => {
    service.productUpdate(res.data)
}); 

router.post('/getProduct', (req, res) => {
    service.getProduct(res.data)
});

router.post('/imgLoad', (req, res) => {
    service.imgLoad(res.data)
});

router.post('/listAll', (req, res) => {
    service.productSave(res.data)
});

module.exports = router