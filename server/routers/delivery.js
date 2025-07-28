const express = require('express');
const router = express.Router();
const service = require('../service/deliveryService')

router.post('/deliverySave', async(req, res) => {
    res.send(await service.deliverySave(req.body))
});

router.post('/deliveryList', async(req, res) => {
    res.send(await service.deliveryList(req.body))
});

router.post('/deliveryStatusUpdate', async(req, res) => {
    res.send(await service.deliveryStatusUpdate(req.body))
});

router.post('/getDelivery', async(req, res) => {
    res.send(await service.getDelivery(req.body))
});

router.post('/courierCompanyList', async(req, res) => {
    res.send(await service.courierCompanyList(req.body))
});

router.post('/searchWaybill', async(req, res) => {
    res.send(await service.searchWaybill(req.body))
});

router.post('/deliveryAddressSave', async(req, res) => {
    res.send(await service.deliveryAddressSave(req.body))
});

router.post('/deliveryAddressChange', async(req, res) => {
    res.send(await service.deliveryAddressChange(req.body))
});

router.post('/deliveryAddressList', async(req, res) => {
    res.send(await service.deliveryAddressList(req.body))
});

router.post('/deliveryAddressDefault', async(req, res) => {
    res.send(await service.deliveryAddressDefault(req.body))
});

router.post('/deliveryAddressOne', async(req, res) => {
    res.send(await service.deliveryAddressOne(req.body))
});

router.post('/deliveryAddressDelete', async(req, res) => {
    res.send(await service.deliveryAddressDelete(req.body))
});

router.post('/deliveryDetailList', async(req, res) => {
    res.send(await service.deliveryDetailList(req.body))
});

router.post('/deliveryDetailCommentsList', async(req, res) => {
    res.send(await service.deliveryDetailCommentsList(req.body))
});

router.post('/courier', async(req, res) => {
    res.send(await service.courier(req.body))
});

module.exports = router