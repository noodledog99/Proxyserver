const express = require('express');
const puppeteer = require('puppeteer');
const replace = require('absolutify');
const vhost = require('vhost');
const pipe = require('express-pipeline');

const Services = require('./service');
const axService = new Services();

const serverOne = express();
const serverTwo = express();
const serverThree = express();
const appServer = express();

//SET port for running server
appServer.set('port', process.env.PORT || 3000);

var loadApp = async function (req, res) {
    let prefixName = req.hostname.split('.')[0];
    console.log(`req.hostname : ${req.hostname}`);
    const urlInfo = await axService.getUrl(prefixName);

    if (!req.query.url) {
        req.query.url = urlInfo.data[0].url;
    }
    console.log(req.query.url);
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://${req.query.url}`);
        let document = await page.evaluate(() => document.documentElement.outerHTML);
        return res.send(document);
    } catch (error) {
        return res.send(error);
    }
}

var appPipeline = pipe([
    loadApp
]);

serverOne.get('/', appPipeline);
// serverTwo.get('/', appPipeline);
// serverThree.get('/', appPipeline);

// appServer.use(vhost(`*.${req.hostname.split('.')[1]}`, serverOne));
appServer.use(vhost('*.localhost', serverOne));
// appServer.use(vhost('dfg.localhost', serverTwo));
// appServer.use(vhost('636897857827711431.localhost', serverThree));

appServer.listen(appServer.get('port'));