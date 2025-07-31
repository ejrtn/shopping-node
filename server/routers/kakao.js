const express = require('express');
const router = express.Router();
const service = require('../service/kakaoService')

router.post('/kakaoPayment/ready', (req, res) => {
    service.ready(req,res)
});

router.get('/kakaoPayment/approve', (req, res) => {
    service.approve(req,res)
});

router.get('/kakaoPayment/cancel', (req,res) => {
    console.log(req.params)
})

router.get('/kakaoPayment/fail', (req,res) => {
    console.log(req.params)
})

router.post('/kakaoPayment/refund', (req, res) => {
    service.refund(req,res)
});

module.exports = router