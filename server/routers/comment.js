const express = require('express');
const router = express.Router();
const service = require('../service/commentService')

router.post('/commentSave', (req, res) => {
    service.commentSave(res.data)
});

router.post('/commentUpdate', (req, res) => {
    service.commentUpdate(res.data)
});

router.post('/productReview', (req, res) => {
    service.productReview(res.data)
});

module.exports = router