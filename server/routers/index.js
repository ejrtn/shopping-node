const express = require('express')
const cart = require('./cart.js')
const chatting = require('./chatting.js')
const comment = require('./comment.js')
const delivery = require('./delivery.js')
const kakao = require('./kakao.js')
const product = require('./product.js')
const user = require('./user.js')
const common = require('./common.js')
const router = express.Router()

router.use('/', cart);
router.use('/', chatting);
router.use('/', delivery);
router.use('/', comment);
router.use('/', kakao);
router.use('/', product);
router.use('/', user);
router.use('/', common);

module.exports = router