const express = require('express');
const session = require('express-session');
const router = express.Router();
const service = require('../service/userService')

router.post('/userSave', (req, res) => {
    service.userSave(req.data)
});

router.post('/userDelete', (req, res) => {
    service.userDelete(req.data)
});

router.post('/login', (req, res) => {
    if(service.login(req.data) == 1){
        req.session.userId = req.data
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('로그아웃 오류');
        res.clearCookie('connect.sid');
    });
}); 

router.post('/passwordUpdate', (req, res) => {
    service.passwordUpdate(res.data)
});

router.post('/findId', (req, res) => {
    service.findId(res.data)
});

router.post('/findPassword', (req, res) => {
    service.findPassword(res.data)
});

router.post('/getUser', (req, res) => {
    service.getUser(res.data)
});

router.post('/chatInfo', (req, res) => {
    service.chatInfo(res.data)
});

router.post('/userList', (req, res) => {
    service.userList(res.data)
});

module.exports = router