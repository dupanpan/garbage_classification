var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 这种具名化的文件就是专门用来创建独立的model的


var schema = new Schema({
    username: { type: String },
    password: {
        type: String,
        select: false, //不显示密码,且有效防止第二次加密
        // 加密
        set(val) {
            // 我安装的是bcrypt包，但引入的是bcryptjs 导致密码验证失败  一直保存失败
            return require('bcrypt').hashSync(val, 10)
                // $2a$10$q9shAFhq2OrVP3jEWkIpTumyvuvPhswb3ZFDQXZ8VWy8TBs42GXXq
        }
    }

});

module.exports = mongoose.model('User', schema)