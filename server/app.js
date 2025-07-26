const express = require('express')
const cors = require('cors');
const session = require('express-session');
const app = express()
const port = process.env.PORT || 5000;
const routers = require('./routers/index');


app.use(session({
    secret: 'mySecretKey',            // 암호화에 사용되는 키
    resave: false,                    // 요청마다 세션을 다시 저장할지 여부
    saveUninitialized: true,          // 초기화되지 않은 세션 저장 여부
    cookie: { maxAge: 60000 }         // 쿠키 유효 시간 (1분)
}));

// 허용할 IP(또는 도메인) 목록
const whitelist = ['http://192.168.56.1:3000', 'http://localhost:3000']; // 예시 IP

const corsOptions = {
  origin: function (origin, callback) {
    // 요청이 없을 수도 있음 (ex: Postman 등은 origin이 undefined)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS 허용되지 않은 origin입니다: ' + origin));
    }
  },
  credentials: true // 필요한 경우: 쿠키 허용
};

app.use(cors());
app.use(express.json());
app.use('/', routers);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})