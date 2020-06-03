var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 这种具名化的文件就是专门用来创建独立的model的
var schema = new Schema({
    city: { type: String }
});

module.exports = mongoose.model('City', schema)