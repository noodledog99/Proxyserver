const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const domainSchema = new Schema({
    domainName: {
        type: String,
        required: true
    },
    urlWeb: {
        type: String,
        required: true
    }
});

var modelDomain = mongoose.model('Domain', domainSchema);
module.exports = modelDomain;