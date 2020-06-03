var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    city: { type: mongoose.SchemaTypes.ObjectId, ref: 'City' },
    recyclable: String,
    dry: String,
    hazardous: String,
    wet: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('Table', schema)