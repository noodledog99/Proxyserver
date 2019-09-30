const express = require('express');
const app = express();
// const uniqid = require('uniqid');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

// Import post route
const postRouters = require('./routers/posts');
app.use('/posts', postRouters);
//connect DB
mongoose.connect(
    process.env.MongoDBConnectionString,
    { useNewUrlParser: true },
    () => {
        console.log('connected to mongo db wth env');
    });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`now port ${port}`));














// // Import api-routes
// let apiRoutes = require("./api-routers");
// // Use Api routes in the App
// app.use('/api', apiRoutes)
// app.use(express.json());

// var domainHost = [
//     {
//         id: uniqid(),
//         domainName: 'abc',
//         urlWeb: 'github.com'
//     },
//     {
//         id: uniqid(),
//         domainName: 'dfg',
//         urlWeb: 'youtube.com'
//     }
// ];

// app.get('/createDb', (req, res) => {
//     // res.send('Hello World');
//     res.send(domainHost);
// })