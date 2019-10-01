const axios = require('axios');

const baseurl = 'http://localhost:5000/api';

class Services {
    async getAll() {
        try {
            return await axios.get(baseurl + '/getAllDomain');
        } catch (error) {
            console.log(error);
        }
    }
    async getUrl(domainName) {
        try {
            return await axios.get(baseurl + '/getDomainName/' + domainName)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Services;

