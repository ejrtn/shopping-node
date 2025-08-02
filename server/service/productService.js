const models = require('../models/productModel')
async function productSave(data){
    let fileName = ((int)(Math.random() * 899999) + 100000)+"-"+new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
    let path = System.property("user.dir")+"/../img/"+fileName+"."+img.getContentType().replace("image/","");
    data.productId = fileName;
    data.img = fileName+"."+img.getContentType().replace("image/","");
    img.transferTo(new File(path));
    return models.productSave(data);
}
async function productList(data){
    list = {}
    list.datas = models.productList({num:(data.num-1)*5});
    list.productTotal = models.productTotal();
    if(data.num%10!=0)list.startNum = data.num-(data.num%10) + 1;
    else list.startNum = data.num-9;
    if(data.num%10!=0) {
        let endNum = data.num-(data.num%10)+10;
        let lastNum = list.productTotal%5>0 ? list.productTotal/5+1 : list.productTotal/5;
        endNum = endNum < lastNum ? endNum : lastNum;
        list.endNum = endNum;
    }
    else list.endNum = data.num;
    return list;
}
async function productTotal(data){
    return models.productTotal();
}
async function productUpdate(data){
    return models.productUpdate(data);
}
async function top10(data){
    return models.top10()
};
async function listAll(data){
    return models.listAll(data)
}
async function getProduct(data) {
    return models.getProduct(data);
}
async function productDelete(data) {
    for(let i=0;i<products.length;i++){
        let ch = await models.productDelete(products[i]);
        if(ch == 0) return ch;
    }
    return 0;
}

module.exports = {
    getProduct,
    listAll,
    productDelete,
    productList,
    productSave,
    productTotal,
    productUpdate,
    top10    
}