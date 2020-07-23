// 后端路由
module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser');
    const assert = require('http-assert');
    const router = express.Router({
        mergeParams: true
    });
    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    // 模型中间件
    const resouceMiddleware = require('../../middleware/resource');
    app.use('/admin/api/rest/:resource', authMiddleware(), resouceMiddleware(), router);


    // const req.Model = require('../../models/req.Model');
    // 创建分类的接口
    router.post('/', authMiddleware(), async(req, res) => {

            const model = await req.Model.create(req.body);
            res.send(model);
        })
        // 更新数据的接口
    router.put('/:id', authMiddleware(), async(req, res) => {
            const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
            res.send(model);
        })
        // 删除数据的接口
    router.delete('/:id', authMiddleware(), async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    })

    // 分类列表的接口
    router.get('/', authMiddleware(), async(req, res) => {
            const queryOptions = {};
            if (req.Model.modelName === 'Category') {
                queryOptions.populate = 'parent'
            }
            const items = await req.Model.find().setOptions(queryOptions).limit(100);
            // console.log(items)
            res.send(items);
        })
        // 分类列表详情的接口(用于修改某条数据)
    router.get('/:id', authMiddleware(), async(req, res) => {
        // console.log(req.id);
        const model = await req.Model.findById(req.params.id)
            // console.log(items)
        res.send(model);
    })


    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads' })
        // 获取上传的文件接口
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res) => {
        const file = await req.file;
        file.url = `http://test.apcesk.com:3000/uploads/${file.filename}`;
        res.send(file);
    });

    // 登录接口
    app.post('/admin/api/login', async(req, res) => {
        // res.send('ok')
        // console.log(req)
        const { username, password } = req.body;
        // console.log(username, password);
        // 1:找用户，根据用户名找用户

        const user = await AdminUser.findOne({ username }).select('+password')
            // console.log(user);
        assert(user, 422, '用户不存在');

        const isValid = require('bcrypt').compareSync(password, user.password);
        assert(isValid, 422, '密码错误');

        const token = jwt.sign({
            id: user._id,
            // _id: user._id,
            // username: user.username,
        }, app.get('secret'));
        res.send({ token });
    })

    // 错误处理函数
    app.use(async(err, req, res, next) => {
        // console.log(err);
        res.status(err.statusCode || 500).send({ message: err.message })
    })
}