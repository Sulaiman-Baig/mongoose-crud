


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





