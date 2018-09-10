var express = require('express');
var bodyParser = require('body-parser');
// var logger = require('morgan');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var axios = require ('axios');
var cheerio = require('cheerio');
var db = require('./models');
var PORT = process.env.PORT || 3000;
var app = express();

// app.use(logger('div'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main'
    })
);
app.set('view engine', 'handlebars');
mongoose.connect("mongodb://localhost/cheerioScraper", { useNewUrlParser: true });

app.get('/', function(req, res) {
    res.render('index');
})

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
})