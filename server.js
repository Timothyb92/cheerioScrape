var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var PORT = process.env.PORT || 3000;

var app = express();

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);
var server = require("http").Server(app);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(PORT, function(){
    console.log('Listening on http://localhost:' + PORT);
})