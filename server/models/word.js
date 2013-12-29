// word schema

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WordSchema = new Schema({
    says: String,
    means: String,
    translation: String,
    language: String,
    more: String,
    addedby: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Word', WordSchema);
