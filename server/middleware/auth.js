module.exports = options => {
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../models/AdminUser');
    const assert = require('http-assert');
    return async (req,res, next)=>{
        // 校验用户是否登录
        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token, 401, '请先登录')
        const {id} = jwt.verify(token, req.app.get('secret'));
        assert(id, 401, '请先登录');
        // console.log(tokenData)
        req.user = await AdminUser.findById(id);
        assert(req.user, 401, '请先登录');
        await next()
    } 
}