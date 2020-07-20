// 物品模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title : {type : String},
    body : {type : String}, // 文章详情
    categories : [{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],// 英雄的类型

},{
    timestamps: true
});


module.exports = mongoose.model('Article', schema)