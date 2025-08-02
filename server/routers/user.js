const express = require('express');
const session = require('express-session');
const router = express.Router();
const service = require('../service/userService')

router.post('/userSave',async (req, res) => {
    service.userSave(req.body)
});

router.post('/userDelete',async (req, res) => {
    service.userDelete(req.body)
});

router.post('/login',async (req, res) => {
    const { userId, password } = req.body;
    const r = await service.login({ userId, password })

    if(r[0][0].cnt == 1){
        req.session.userId = userId
        // ✅ 세션 저장 후 응답 보내기
        req.session.save(err => {
            if (err) {
                return res.status(500).send({ loggedIn: false, message: '세션 저장 실패' });
            }
            res.send({ loggedIn: true, userId });
        });
    }else {
        res.status(401).send({ loggedIn: false, message: '로그인 실패' });
    }
});

router.get('/session', (req, res) => {
    if (req.session.userId) {
        res.send({ loggedIn: true, userId: req.session.userId });
    } else {
        res.send({ loggedIn: false });
    }
});

router.post('/logout',async (req, res) => {
    req.session.destroy(err => {
        res.send({ loggedIn: false });
    });
}); 

router.post('/passwordUpdate',async (req, res) => {
    service.passwordUpdate(req.body)
});

router.post('/findId',async (req, res) => {
    service.findId(req.body)
});

router.post('/findPassword',async (req, res) => {
    service.findPassword(req.body)
});

router.post('/getUser',async (req, res) => {
    service.getUser(req.body)
});

router.post('/chatInfo',async (req, res) => {
    service.chatInfo(req.body)
});

router.post('/userList',async (req, res) => {
    service.userList(req.body)
});

module.exports = router