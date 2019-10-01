//import express
const express = require('express');
const puppeteer = require('puppeteer');
const replace = require('absolutify');
const vhost = require('vhost');
const pipe = require('express-pipeline');
const http = require('http');

const app1 = express();
const app2 = express();
const app = express();

const PORT = process.env.PORT || 5555;

var loadApp = async function (req, res) {
    let prefixName = req.hostname.split('.')[0];
    if (!req.query.url) {
        // req.query.url = prefixName == 'abc' ? 'github.com' : 'youtube.com';
        await http.get({
            hostname: 'http://localhost:3000/getapi',
            port: 3000,
            path: `/getByName/${prefixName}`,
            agent: false  // Create a new agent just for this one request
        }, (res) => {
            // Do stuff with response
            req.query.url = res;
            console.log(req.query.url);
        });
    }
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

app1.get('/', appPipeline);
app2.get('/', appPipeline);

app.use(vhost('abc.localhost', app1))
app.use(vhost('dfg.localhost', app2))

app.listen(PORT);