const express = require('express');
const router = express.Router();
const service = require('../service/deliveryService')

router.post('/deliverySave', (req, res) => {
    service.deliverySave(req.data)
});

router.post('/deliveryList', (req, res) => {
    service.deliveryList(req.data)
});

router.post('/deliveryStatusUpdate', (req, res) => {
    service.deliveryStatusUpdate(req.data)
});

router.post('/getDelivery', (req, res) => {
    service.getDelivery(req.data)
});

router.post('/courierCompanyList', (req, res) => {
    service.courierCompanyList(req.data)
});

router.post('/searchWaybill', (req, res) => {
    service.searchWaybill(req.data)
});

router.post('/deliveryAddressSave', (req, res) => {
    service.deliveryAddressSave(req.data)
});

router.post('/deliveryAddressChange', (req, res) => {
    service.deliveryAddressChange(req.data)
});

router.post('/deliveryAddressList', (req, res) => {
    service.deliveryAddressList(req.data)
});

router.post('/deliveryAddressDefault', async(req, res) => {
    res.send(await service.deliveryAddressDefault(req.body))
});

router.post('/deliveryAddressOne', (req, res) => {
    service.deliveryAddressOne(req.data)
});

router.post('/deliveryAddressDelete', (req, res) => {
    service.deliveryAddressDelete(req.data)
});

router.post('/deliveryDetailList', (req, res) => {
    service.deliveryDetailList(req.data)
});

router.post('/deliveryDetailCommentsList', (req, res) => {
    service.deliveryDetailCommentsList(req.data)
});

router.post('/courier', (req, res) => {
    service.courier(req.data)
});

module.exports = router