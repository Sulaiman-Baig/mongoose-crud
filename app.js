var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 5000;
var db = 'mongodb+srv://user:cruduser@cluster0.u9l50pz.mongodb.net/?retryWrites=true&w=majority';

var books = require('./routes/books');

mongoose.connect(db, { useNewUrlParser: true })
// .then((connected) => {
//     console.log(`connected to mongodb`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/books', books);

// })
// .catch((err) => {
//     console.log(err);
// });



app.get('/', function (req, res) {
    console.log('app starting on port: ' + port)
    res.send('tes express nodejs mongodb');
});

app.listen(port, function () {
    console.log('app listening on port: ' + port);
});