const models = require('../models/ipModel')
async function ipSave(data){
    return models.ipSave(data);
}
async function ipCheck(data){
    return models.ipCheck(data);
}
async function ipList(data){
    return models.ipList(data);
}
async function ipDelete(data){
    return models.ipDelete(data);
}
async function ipUpdate(data){
    return models.ipUpdate(data);
}
module.exports = {
    ipSave,
    ipDelete,
    ipList,
    ipUpdate,
    ipCheck
}