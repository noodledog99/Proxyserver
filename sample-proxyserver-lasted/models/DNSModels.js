const mongoose = require('mongoose');

const dnsSchema = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    domainName: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('DomainNames', dnsSchema);