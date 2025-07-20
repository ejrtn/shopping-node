const express = require('express');
const router = express.Router();
const service = require('../service/commentService')

router.post('/commentSave', (req, res) => {
    service.commentSave(req.data)
});

router.post('/commentUpdate', (req, res) => {
    service.commentUpdate(req.data)
});

router.post('/productReview', (req, res) => {
    service.productReview(req.data)
});

module.exports = router