var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(PORT, function(){
    console.log('Listening on http://localhost:' + PORT);
})