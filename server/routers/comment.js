const express = require('express');
const router = express.Router();
const service = require('../service/commentService')

router.post('/commentSave', async (req, res) => {
    res.send(await service.commentSave(req.body))
});

router.post('/commentUpdate', (req, res) => {
    service.commentUpdate(req.body)
});

router.post('/productReview', (req, res) => {
    service.productReview(req.body)
});

module.exports = router