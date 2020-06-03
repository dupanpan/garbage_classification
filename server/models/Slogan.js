const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Slogan', schema, 'slogans')