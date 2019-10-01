const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

const postRouter = require('./routers/posts');
const getRouter = require('./routers/gets');

app.use('/postapi', postRouter);
app.use('/getapi', getRouter);

mongoose.connect(
    process.env.MongoDBConnectionString,
    { useNewUrlParser: true },
    () => {
        console.log('connected to mongo db already');
    });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connection port : ${port}`));

