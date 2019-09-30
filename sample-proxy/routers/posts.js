const express = require('express');
const router = express.Router();
const domainModel = require('../models/Domain');

//get all
router.get('/getAllDomain', async (req, res) => {
    try {
        let post = await domainModel.find();
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});
//post create
router.post('/createDomain', async (req, res) => {
    console.log(req.body);
    let post = new domainModel({
        domainName: req.body.domainName,
        urlWeb: req.body.urlWeb
    });
    //async await
    try {
        const saveToDb = await post.save();
        res.json(saveToDb);
    }
    catch (err) {
        res.json({ message: err });
    }
    // Promise
    // post.save()
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch(err => {
    //         res.json({ message: err });
    //     });
});
//get specific
router.get('/getdomain/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const post = await domainModel.findOne({ _id: req.params.id });
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }

});

router.get('/getDomain2/:dmName', async (req, res) => {
    try {
        const post = await domainModel.findOne({ domainName: req.params.dmName });
        res.json(post);
    }
    catch (err) {
        res.json({ messageErrWa: err });
    }
});
//delete
router.delete('/delete/:id', async (req, res) => {
    try {
        const remove = await domainModel.deleteOne({ _id: req.params.id });
        res.json(remove);
    } catch (err) {
        res.json({ message: err });
    }
});
//update
router.patch('/update/:id', async (req, res) => {
    try {
        const update = await domainModel.updateOne(
            { _id: req.params.id },
            { $set: { domainName: req.body.domainName } }
        );
        res.json(update);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;