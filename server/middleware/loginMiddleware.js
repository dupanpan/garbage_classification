module.exports = options => {




    return async(req, res, next) => {
        // 此中间件用来校验用户是否登录
        // 用空格分隔,返回数组,然后pop出数组中的最后一个元素,拿到token
        const assert = require('http-assert')
        const jwt = require('jsonwebtoken')
        const AdminUser = require("../models/AdminUser.js")
        const token = String(req.headers.authorization || '').split(' ').pop()

        assert(token, 401, "请先登录")
        const { id } = jwt.verify(token, req.app.get('secret')) //验证 token
            // 根据解析token拿到的id 查询数据库看是不是真的有这个用户,不是伪造的token
        assert(id, 401, '请先登录') //看看有没有通过token拿到id
        req.user = await AdminUser.findById(id) //把查询到的用户挂载到req上表示 是哪个用户在请求
        assert(req.user, 401, '请先登录') //没有查到这个用户
        await next()
    }
}