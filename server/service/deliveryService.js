const models = require('../models/deliveryModel')

async function deliverySave(data){
    let result = models.deliverySave(data);
    if(result == 1) {
        for (let i = 0; i < data.deliveryDetailDtos.length; i++) {
            data.deliveryDetailDtos[i].deliveryId=data.deliveryId;
            models.deliveryDetailSave(data.getDeliveryDetailDtos()[i]);
        }
    }
    return result;
}
async function deliveryList(data){
    return models.deliveryList(data);
}
async function deliveryStatusUpdate(data){
    return models.deliveryStatusUpdate(data);
}
async function deliveryRepay(data){
    return models.deliveryRepay(data);
}
async function getDelivery(data){
    return models.getDelivery(data);
}
async function deliveryAddressSave(data) {
    if(data.defaultYn == "Y"){
        await models.deliveryAddressChangeDefaultYn(data);
    }
    return models.deliveryAddressSave(data);
}
async function  deliveryAddressChange(data) {
    if(data.defaultYn == "Y"){
        await models.deliveryAddressChangeDefaultYn(data);
    }
    return models.deliveryAddressChange(data);
}
async function deliveryAddressList(data) {
    return models.deliveryAddressList(data);
}
async function deliveryAddressDefault(data){
    return models.deliveryAddressDefault(data);
}
async function deliveryAddressDelete(data) {
    return models.deliveryAddressDelete(data);
}
async function deliveryAddressOne(data) {
    return models.deliveryAddressOne(data);
}
async function deliveryDetailList(data){
    return models.deliveryDetailList(data);
}
async function deliveryDetailCommentsList(data){
    return models.deliveryDetailCommentsList(data);
}

module.exports = {
    deliveryAddressChange,
    deliveryAddressDefault,
    deliveryAddressDelete,
    deliveryAddressList,
    deliveryAddressOne,
    deliveryAddressSave,
    deliveryDetailCommentsList,
    deliveryDetailList,
    deliveryList,
    deliveryRepay,
    deliverySave,
    deliveryStatusUpdate,
    getDelivery
}