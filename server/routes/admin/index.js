// 后端路由
module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require('../../models/Category');
    // 创建分类的接口
    router.post('/categories', async (req,res)=>{
        const model = await Category.create(req.body);
        res.send(model); 
    })

    router.put('/categories/:id', async (req,res)=>{
        const model = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.send(model); 
    })

    // 分类列表的接口
    router.get('/categories', async (req,res)=>{
        // console.log(req);
        const items = await Category.find().limit(10);
        // console.log(items)
        res.send(items); 
    })
    // 分类列表详情的接口(用于修改某条数据)
    router.get('/categories/:id', async (req,res)=>{
        // console.log(req.id);
        const model = await Category.findById(req.params.id)
        // console.log(items)
        res.send(model); 
    })
    app.use('/admin/api', router);
} 