const mongoose = require('mongoose');
const schema = mongoose.Schema;
const domainSchema = new schema({
    domainName: {
        type: String,
        required: true
    },
    urlWeb: {
        type: String,
        required: true
    }
});

var domainCollection = mongoose.model('Domain', domainSchema);
module.exports = domainCollection;