const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//Import Routes
const domainRouter = require('./routes/managedns');

//Routes middleware
app.use('/api', domainRouter);

//SET port for running server
app.set('port', process.env.PORT || 5000);

//Connect DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('connected to DB');
    });


//Run server
app.listen(app.get('port'));