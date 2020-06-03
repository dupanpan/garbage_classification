var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 这种具名化的文件就是专门用来创建独立的model的


var schema = new Schema({
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], //因为一篇文章可能属于公告又可能属于热门，属于多个分类
    body: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Article', schema)