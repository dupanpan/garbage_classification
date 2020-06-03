var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    subject: String,
    options: {
        opt_1: { order: String, text: String },
        opt_2: { order: String, text: String },
        opt_3: { order: String, text: String },
        opt_4: { order: String, text: String }
    },
    answer: [{ type: String }],
    // answer中只保存选项
    type: String
});

module.exports = mongoose.model('Quiz', schema, 'quizzes')

// admin界面如何 设置
//现在的首要任务是怎么存到数据库

// 如果是多选题  答案就是 seelect 多选
// 那物品就要获取 题目类型也就是v-model :type 
//if type===multiple 
// 就是多选列表

//  单选按钮
// 还得把选项存到一个数组中去  
// 怎么存？