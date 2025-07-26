const fs = require('fs');
const path = require('path');
async function imgLoad(req,res) {
    fs.readFile(path.join(__dirname, '../../../')+"img/"+req.query.img, (err, data) => {
        if (err) {
            return res.status(500).send('이미지를 읽을 수 없습니다.');
        }

        res.writeHead(200, { 'Content-Type': 'image/webp' }); // 파일 형식에 맞게 설정
        res.end(data);
    });
}

module.exports = {
    imgLoad,
}