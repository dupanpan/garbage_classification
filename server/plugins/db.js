module.exports = app => { //module.exports导出的是一个函数，接收一个参数app
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-waste', {
        useNewUrlParser: true
    })

    // 将models全部引用一遍
    require('require-all')(__dirname + '/../models')

}