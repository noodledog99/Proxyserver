const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

//IMPORT MODELS
const DomainModel = require('../models/DNSModels');

//GET ALL DATA
router.get('/getAllDomain', async (req, res) => {
    try {
        const domains = await DomainModel.find();
        res.json(domains);
    } catch (error) {
        res.json({ message: error });
    }
});

//SPECIFIC GET
router.get('/getDomainName/:strDomain', async (req, res) => {
    try {
        const getUrl = await DomainModel.find({ domainName: req.params.strDomain });
        res.json(getUrl);
    } catch (error) {
        res.json({ message: error });
    }
})

//SUBMIT A POST
router.post('/addDomain', async (req, res) => {
    const descriptionDomain = new DomainModel({
        _id: uuidv4(),
        domainName: req.body.domainName,
        url: req.body.url
    });
    try {
        const addDomain = await descriptionDomain.save();
        res.json(addDomain);
    }
    catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;