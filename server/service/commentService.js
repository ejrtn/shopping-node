const models = require('../models/commentModel')

async function commentSave(data){
    return models.commentSave(data)
}

async function commentUpdate(data){
    return models.commentUpdate(data)
}

async function productReview(data){
    return models.productReview(data)
}

module.exports = {
    commentSave,
    commentUpdate,
    productReview
}