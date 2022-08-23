// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var port = 8080;
// var db = 'mongodb+srv://user:cruduser@cluster0.u9l50pz.mongodb.net/?retryWrites=true&w=majority';

// var books = require('./routes/books');

// mongoose.connect(db, { useNewUrlParser: true })
// // .then((connected) => {
// //     console.log(`connected to mongodb`);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use('/books', books);

// // })
// // .catch((err) => {
// //     console.log(err);
// // });



// app.get('/', function (req, res) {
//     console.log('app starting on port: ' + port)
//     res.send('tes express nodejs mongodb');
// });

// app.listen(port, function () {
//     console.log('app listening on port: ' + port);
// });


const express = require("express");
require('dotenv').config();
const cors = require('cors');

const bodyParser = require('body-parser');
const { connectMongodb } = require("./lib");

var books = require('./routes/books');
const app = express();

var corsOptions = {
    origin: function (origin, callback) {
        callback(null, true)
    }
}

app.use(cors(corsOptions))
app.use(bodyParser.json({
    verify: function (req, res, buf) {
        if (req.originalUrl === '/webhook') {
            req.rawBody = buf.toString();
        }
    }
}));



connectMongodb()
    .then((connected) => {
        console.log(`connected to mongodb`);

        app.use('/books', books);



    })
    .catch((err) => {
        console.log(err);
    });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});





