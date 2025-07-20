const express = require('express');
const router = express.Router();
const service = require('../service/deliveryService')

router.post('/deliverySave', (req, res) => {
    service.deliverySave(res.data)
});

router.post('/deliveryList', (req, res) => {
    service.deliveryList(res.data)
});

router.post('/deliveryStatusUpdate', (req, res) => {
    service.deliveryStatusUpdate(res.data)
});

router.post('/getDelivery', (req, res) => {
    service.getDelivery(res.data)
});

router.post('/courierCompanyList', (req, res) => {
    service.courierCompanyList(res.data)
});

router.post('/searchWaybill', (req, res) => {
    service.searchWaybill(res.data)
});

router.post('/deliveryAddressSave', (req, res) => {
    service.deliveryAddressSave(res.data)
});

router.post('/deliveryAddressChange', (req, res) => {
    service.deliveryAddressChange(res.data)
});

router.post('/deliveryAddressList', (req, res) => {
    service.deliveryAddressList(res.data)
});

router.post('/deliveryAddressDefault', (req, res) => {
    service.deliveryAddressDefault(res.data)
});

router.post('/deliveryAddressOne', (req, res) => {
    service.deliveryAddressOne(res.data)
});

router.post('/deliveryAddressDelete', (req, res) => {
    service.deliveryAddressDelete(res.data)
});

router.post('/deliveryDetailList', (req, res) => {
    service.deliveryDetailList(res.data)
});

router.post('/deliveryDetailCommentsList', (req, res) => {
    service.deliveryDetailCommentsList(res.data)
});

router.post('/courier', (req, res) => {
    service.courier(res.data)
});

module.exports = router