const express = require('express');
const router = express.Router();
const domainCollection = require('../models/DomainModel');

router.post('/createDomain', async (req, res) => {
    let post = new domainCollection({
        domainName: req.body.domainName,
        urlWeb: req.body.urlWeb
    });
    try {
        const saveToDB = await post.save();
        res.send(saveToDB);
    } catch (err) {
        res.send({ messageErr: err });
    }
});

module.exports = router;
