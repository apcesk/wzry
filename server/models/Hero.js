// 物品模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {type : String},
    avatar : {type: String},// 头像的地址
    banner : {type: String},// 详情页背景
    title : {type: String},// 英雄的称号
    categories : [{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],// 英雄的类型
    scores : {
        difficult : {type: Number}, // 英雄操作难度
        skills : {type: Number}, // 技能难度
        attack : {type: Number}, // 攻击难度
        servive : {type: Number}, // 生存难度
    },
    skills : [{
        icon : {type: String},// 技能图标
        name : {type: String},// 技能名称
        delay : {type: String},// 技能冷却
        cost : {type: String},// 技能消耗
        description : {type: String},// 技能介绍
        tips : {type: String},// 小提示
    }],
    items1 : [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],// 顺风出装
    items2 : [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],// 逆风出装
    usageTips : {type: String}, // 使用技巧
    battleTipes : {type: String}, // 对抗技巧
    teamTipes : {type: String}, // 团战思路
    partners : [{
        hero : {type: mongoose.SchemaTypes.ObjectId, ref:'Hero'},//英雄
        description : {type: String}, // 搭档描述
    }], // 最佳搭档
});


module.exports = mongoose.model('Hero', schema, 'heroes')