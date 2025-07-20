const express = require('express')
const session = require('express-session');
const app = express()
const port = process.env.PORT || 3000;
const routers = require('./routers/index');

app.use(session({
    secret: 'mySecretKey',            // 암호화에 사용되는 키
    resave: false,                    // 요청마다 세션을 다시 저장할지 여부
    saveUninitialized: true,          // 초기화되지 않은 세션 저장 여부
    cookie: { maxAge: 60000 }         // 쿠키 유효 시간 (1분)
}));

app.use(express.json());
app.use('/', routers);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})