// const express = require("express")

// const app = express()



// app.use(express.json()) //要想使用await 必须添加此中间件
// app.use(require('cors')()) //跨域模块

// // 使用静态文件托管，使图片对前端用户可见
// app.use('/uploads', express.static(__dirname + '/uploads'))

// require('./plugins/db')(app)
// require('./routes/admin')(app)

// app.listen(3000, () => {
//     console.log("http://localhost:3000");
// })


//作为服务端的入口文件

const express = require('express')

const app = express()
    // 给当前的express实例,设置一个secret属性,用于token
    // app.set('secret', 'bbear123')
app.set('secret', 'i3uhdy4j56m98ybt')

//跨域和json都可以使用
app.use(require('cors')())
app.use(express.json())

const path = require('path')


// 托管静态文件，让uploads文件夹里面的所有文件，可以通过/uploads来访问
// /uploads uploads 相对于server的地址
app.use('/uploads', express.static(__dirname + '/uploads'))
require('./plugins/db.js')(app)
    //require index.js 获得一个方法,要求传一个app对象进去
require('./routes/admin/index.js')(app) //管理界面的路由接口
require('./routes/web/index.js')(app) //前端的路由接口

// // admin文件夹托管到/admin地址上去
// app.use('/admin', express.static(__dirname + '/admin'))

// // web文件夹托管到/地址上去
// app.use('/', express.static(__dirname + '/web'))
app.listen('3000', () => {
    console.log("app running at port 3000....")
})