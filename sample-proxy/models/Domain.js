const mongoose = require('mongoose');

const domainSchema = mongoose.Schema({
    domainName: String,
    urlWeb: String
});

// const domainSchema = mongoose.Schema({
//     id: {
//         type : String,
//         default : uniqid()
//     },
//     domainName: String,
//     urlWeb: String
// });

module.exports = mongoose.model('Domain', domainSchema)