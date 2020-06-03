var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String },
    city: { type: mongoose.SchemaTypes.ObjectId, ref: 'City' },

}, {
    timestamps: true,
});

module.exports = mongoose.model('Place', schema)