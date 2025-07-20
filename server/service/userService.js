require('dotenv').config(); // 맨 위에서 호출해야 함
const models = require('../models/userModel')

async function createUserChatHistory(data){
    models.createUserChatHistory(data);
}
async function userSave(data){
    return models.userSave(data);
}
async function userDelete(data){
    return models.userDelete(data);
}
async function login(data){
    return models.login(data);
}
async function passwordUpdate(data){
    return models.passwordUpdate2(data);
}
async function passwordUpdate(data){
    return models.passwordUpdate(data);
}
async function findId(data){
    return models.findId(data);
}
async function findPassword(data){
    let result = models.findPassword(data);
    if(!result != '0'){
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true, // 포트 465는 TLS 필요
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD, // 일반 비밀번호가 아닌 앱 비밀번호 권장
            },
        });
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: 'recipient@example.com',
            subject: 'DEOKSU 비밀번호 새로 발급',
            text: "DEOKSU\n새로 발급 비밀번호 : "+result+"\n로그인 후 비밀번호 변경해주시기 바랍니다.",
        };

        try {
            const info = await transporter.sendMail(mailOptions);
        } catch (err) {
            console.error('메일 전송 실패:', err);
        }
    }else{
        return 0;
    }
}
async function idDoubleCheck(data){
    return models.idDoubleCheck(data);
}
async function getUser(data) {
    return models.getUser(data);
}
async function userUpdate(data){
    return models.userUpdate(data);
}
async function chatInfo(data){
    return models.chatInfo(data);
}
async function userList(start) {
    return models.userList(start);
}

module.exports = {
    chatInfo,
    createUserChatHistory,
    findId,
    findPassword,
    getUser,
    idDoubleCheck,
    login,
    passwordUpdate,
    userDelete,
    userList,
    userSave,
    userUpdate
}