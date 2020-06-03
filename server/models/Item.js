const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    category: {
        //表示是芒果数据库里面的一个id,千万不能设成字符串
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category' //所关联的模型
    },
    icon: { type: String }
})

module.exports = mongoose.model('Item', schema, 'items')