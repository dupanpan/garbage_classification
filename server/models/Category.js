const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: { type: String },
    parent: {
        //表示是芒果数据库里面的一个id,千万不能设成字符串
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category' //所关联的模型
    }
})

module.exports = mongoose.model('Category', schema)