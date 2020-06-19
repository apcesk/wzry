// 后端路由
module.exports = app => {
    const express = require('express');
    const router = express.Router({
        mergeParams: true
    });
    // const req.Model = require('../../models/req.Model');
    // 创建分类的接口
    router.post('/', async (req,res)=>{
        
        const model = await req.Model.create(req.body);
        res.send(model); 
    })
    // 更新数据的接口
    router.put('/:id', async (req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model); 
    })
    // 删除数据的接口
    router.delete('/:id', async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        }); 
    })
    
    // 分类列表的接口
    router.get('/', async (req,res)=>{
        const queryOptions = {};
        if (req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        // console.log(items)
        res.send(items); 
    })
    // 分类列表详情的接口(用于修改某条数据)
    router.get('/:id', async (req,res)=>{
        // console.log(req.id);
        const model = await req.Model.findById(req.params.id)
        // console.log(items)
        res.send(model); 
    })
    app.use('/admin/api/rest/:resource', async (req, res, next)=>{
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`);
        next();
    },router);


    const multer = require('multer');
    const upload = multer({dest: __dirname + '/../../uploads'})
    // 获取上传的文件接口
    app.post('/admin/api/upload', upload.single('file'), async (req,res)=>{
        const file = await req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });

    // 登录接口
    app.post('/admin/api/login', async (req,res)=>{
        // res.send('ok')
        // console.log(req)
        const {username, password} = req.body;
        // console.log(username, password);
        // 1:找用户，根据用户名找用户
        const AdminUser = require('../../models/AdminUser');
        const user = await AdminUser.findOne({username}).select('+password')
        console.log(user);
        if (!user){
            return res.status(422).send({
                message:'用户不存在'
            })
        }
        // 2:校验密码
        const isValid = require('bcrypt').compareSync(password, user.password);
        if (!isValid){
            return res.status(422).send({
                message: '密码错误'
            })
        }
        // 3:返回token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({
            id: user._id,
            // _id: user._id,
            // username: user.username,
        }, app.get('secret'));
        res.send({token});
    })

} 