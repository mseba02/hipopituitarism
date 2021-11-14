// imports
require('dotenv').config();
const path = require('path');


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const HttpError = require('./models/http-error');
const userRoutes = require('./routes/user-routes');


// middleware
const app = express();

app.use(cors());

// parsing application/json
app.use(express.json());

// routes
app.use('/users', userRoutes);

// 404 route
// app.use( (req, res) => {
//     const error = new HttpError('Could not find this route', 404);
//     throw error;
// });

// error
app.use((error, req, res, next) => {

    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

app.use(express.static(path.join(__dirname+'/client/build')));
app.get('/', function(req, res) {
    res.sendFile('index.html',{root:__dirname+'/client/build'});
});

// connect to mongo
mongoose
    .connect(process.env.MONGO_URL)
    .then( () => {
        app.listen(process.env.PORT || 6969);
    })
    .catch(e => {
        console.log(e)
    });

