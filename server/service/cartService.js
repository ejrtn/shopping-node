const models = require('../models/cartModel')

async function cartSave(data) {
    return models.cartSave(data)
}

async function cartList(data) {
    return models.cartList(data)
}

async function cartDelete(data) {
    return models.cartDelete(data)
}

async function tmpCartDelete(data) {
    return models.tmpCartDelete(data)
}

async function tmpCartSave(data) {
    let key = crypto.randomUUID();
    let r = 0;
    for(let i=0;i<data.length;i++){
        data[i]['keyData']=key;
        r += await models.tmpCartSave(data[i]);
    }
    return r==data.length?key:''
}

async function tmpCartList(data) {
    return await models.tmpCartList(data)
}

module.exports = {
    cartSave,
    cartList,
    cartDelete,
    tmpCartDelete,
    tmpCartSave,
    tmpCartList,
}