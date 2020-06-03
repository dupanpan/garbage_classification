//前面的app表示要接收的参数的形参 app 
// 这里导出的是一个方法,需要传一个app对象进来
module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    const jwt = require('jsonwebtoken')

    const AdminUser = require("../../models/AdminUser")

    const assert = require('http-assert')


    // 要想使用async await 还得在 入口文件 中添加app.use(express.json())

    //创建分类
    router.post('/', (req, res) => {
        const model = req.Model.create(req.body)
        res.send(model)
    })


    // 资源list
    router.get('/', async(req, res) => {
            // populate如果哪一个字段是关联字段，可以查出来
            // console.log(req.Model.modelName) //model里面有一个属性就是modelName
            const queryOptions = {}

            if (req.Model.modelName === 'Category') {
                queryOptions.populate = 'parent'
            }
            if (req.Model.modelName === 'Item') {
                queryOptions.populate = 'category'
            }
            if (req.Model.modelName === 'Article') {
                queryOptions.populate = 'categories'
            }
            if (req.Model.modelName === 'Origin' || req.Model.modelName === 'Place' || req.Model.modelName === 'Table') {
                queryOptions.populate = 'city'
            }

            const items = await req.Model.find().sort({ '_id': -1 }).setOptions(queryOptions)
            res.send(items)
        })
        // 资源详情
        //根据id拿到对象 get 是req.param  post 是 req.body
    router.get('/:id', async(req, res) => {
            const model = await req.Model.findById(req.params.id)
            res.send(model)
        })
        // 更新资源
    router.put('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除资源
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //父级分类是垃圾分类的分类接口

    router.get('/garbage_categories', async(req, res) => {
        const parent = await req.Model.findOne({
            name: '垃圾分类'
        })
        const cats = await req.Model.aggregate([
                { $match: { parent: parent._id } },

            ])
            //返回垃圾分类的子分类 
        res.send(cats)
    })

    // 登录校验中间件
    const loginMiddleware = require('../../middleware/loginMiddleware.js')
        // 获取模型的资源中间件
    const resourceMiddleware = require('../../middleware/resourceMiddleware')

    // app.use('/admin/api', router)
    // 1.有没有token
    // 2.对应相应的模型
    app.use('/admin/api/rest/:resource', loginMiddleware(), resourceMiddleware(), router)


    // 为了上传图片服务

    const multer = require('multer')
    const path = require('path')
    const dest = path.join(__dirname, '../../uploads')
    const upload = multer({ dest })
        // console.log(dest)
        //一定要加upload.single(file) 才会有req.file
    app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
        const file = req.file
            // 记得这里的filename是小写 
            // file.url = `http://glory.dupanpan.top/uploads/${file.filename}`
        file.url = `http://localhost:3000/uploads/${file.filename}`
        console.log(file)
        console.log(file.fileName)
        res.send(file)
    })

    app.post('/admin/api/login', async(req, res) => {
        // 解构赋值
        const { username, password } = req.body
            //1. 根据用户名找用户
            // 这里之所以使用select('+password'),是由于我们在AdminUser中,设置了select:false,默认就查不到
        const user = await AdminUser.findOne({ username }).select('+password')
            // 这里使用http-assert 直接抛出错误,让express的错误处理中间件来统一处理就好
        assert(user, 422, '用户不存在')

        //2. 校验密码 :由于我们的密码已经被加密的,(职业操守:就算是开发人员也不知道用户的密码),
        // 所以不能通过明文找到用户
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        //3. 返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    // 错误处理函数
    app.use(async(err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}