//import express
const express = require('express');
const puppeteer = require('puppeteer');
const replace = require('absolutify');
const vhost = require('vhost');
const pipe = require('express-pipeline');

const app1 = express();
const app2 = express();
const app = express();

const PORT = process.env.PORT || 3000;

// var loadAppOne = async function (req, res) {
//     if (!req.query.url) {
//         req.query.url = 'github.com';
//     }
//     console.log(req.query.url);
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto(`https://${req.query.url}`);
//         // await page.screenshot({ path:'xxx.png'})
//         let document = await page.evaluate(() => document.documentElement.outerHTML);
//         document = replace(document, `?url=${req.query.url.split('/')[0]}`)
//         return res.send(document)

//     } catch (error) {
//         return res.send(error);
//     }
// }
var loadApp = async function (req, res) {
    let prefixName = req.hostname.split('.')[0];
    if (!req.query.url) {
        req.query.url = prefixName == 'abc' ? 'github.com' : 'youtube.com';
    }
    console.log(req.query.url);
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://${req.query.url}`);
        // await page.screenshot({ path:'xxx.png'})
        let document = await page.evaluate(() => document.documentElement.outerHTML);
        document = replace(document, `?url=${req.query.url.split('/')[0]}`)
        return res.send(document)

    } catch (error) {
        return res.send(error);
    }
}

var appPipeline = pipe([
    loadApp
]);
// var appTwoPipeline = pipe([
//     loadAppTwo
// ]);

app1.get('/app/', appPipeline);
app2.get('/app/', appPipeline);

app.use(vhost('abc.mana.com', app1))
app.use(vhost('dfg.mana.com', app2))

app.listen(PORT);