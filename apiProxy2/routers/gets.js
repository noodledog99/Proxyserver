const express = require('express');
const router = express.Router();
const domainCollection = require('../models/DomainModel');

router.get('/getAll', async (req, res) => {
    try {
        let get = await domainCollection.find();
        res.json(get);
    }
    catch (err) {
        res.json({ messageErr: err });
    }
});

router.get('/getById/:id', async (req, res) => {
    try {
        let get = await domainCollection.findOne({ _id: req.params.id });
        res.json(get);
    }
    catch (err) {
        res.json({ messageErr: err });
    }
});

router.get('/getByName/:name', async (req, res) => {
    try {
        let get = await domainCollection.findOne({ domainName: req.params.name });
        res.json(get.urlWeb);
    }
    catch (err) {
        res.json({ messageErr: err });
    }
});

module.exports = router;
