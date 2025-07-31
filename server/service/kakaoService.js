require('dotenv').config(); // 맨 위에서 호출해야 함
const axios = require('axios');
const deliveryModel = require('../models/deliveryModel')

let tid;
async function ready(req,res){
    try {
        const data = req.body
        const response = await axios.post('https://open-api.kakaopay.com/online/v1/payment/ready',
        {
            cid: process.env.KAKAO_CID,
            partner_order_id: '1',
            partner_user_id: '1',
            item_name: "DEOKSU "+data.quantity+"개 제품 구매",
            quantity: data.quantity,
            total_amount: data.totalAmount,
            tax_free_amount: 0,
            approval_url: "http://localhost:5000/kakaoPayment/approve",
            cancel_url: "http://localhost:5000/kakaoPayment/cancel",
            fail_url: "http://localhost:5000/kakaoPayment/fail",
        },
        {
            headers: {
                Authorization: "DEV_SECRET_KEY " + process.env.KAKAO_SECRETKEY,
                'Content-type': 'application/json',
            },
        }
        );
        
        tid = response.data.tid
        if(data.deliveryId != null){
            deliveryModel.deliveryRepay({'newTid':data.tid,'tid':tid});
        }else {
            data['tid'] = tid
            const r = await deliveryModel.deliverySave(data);

            await data.deliveryDetailDtos.map(async (item)=>{
                if(r != 0) {
                    item.deliveryId = r
                    item.cnt = JSON.stringify(item.cnt)
                    await deliveryModel.deliveryDetailSave(item)
                }
            })
        }
        res.json({ next_redirect_pc_url: response.data.next_redirect_pc_url, tid: tid });
    } catch (error) {
        // 프론트에 redirect URL 전달
        console.error(error.response?.data || error.message);
        res.status(500).send('결제 준비 실패');
    }
}

async function approve(req, res){
    const { pg_token } = req.query;

    try {
        const response = await axios.post('https://open-api.kakaopay.com/online/v1/payment/approve',
        {
            cid: process.env.KAKAO_CID,
            tid: tid,
            partner_order_id: '1',
            partner_user_id: '1',
            pg_token: pg_token,
        },
        {
            headers: {
                Authorization: "DEV_SECRET_KEY " + process.env.KAKAO_SECRETKEY,
                'Content-type': 'application/json',
            },
        }
        );
        res.redirect(`http://localhost:3000/kakaoPayment/approve?tid=${response.data.tid}`); // 승인된 결제 정보 react 반환

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send('결제 승인 실패');
    }
}
async function refund(req,res){
    try {
        const response = await axios.post(
        'https://open-api.kakaopay.com/online/v1/payment/cancel',
        {
            cid: process.env.KAKAO_CID,
            tid: req.body.tid,
            cancel_amount: req.body.amount,
            cancel_tax_free_amount: 0,
        },
        {
            headers: {
                Authorization: "DEV_SECRET_KEY " + process.env.KAKAO_SECRETKEY,
                'Content-type': 'application/json',
            },
        }
        );
        deliveryService.deliveryStatusUpdate(tid,"결제취소");

        res.json(response.data); // 승인된 결제 정보 반환
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send('결제 승인 실패');
    }
}
module.exports = {
    ready,
    approve,
    refund
}