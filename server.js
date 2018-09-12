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

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/saved', (req, res) => {
    res.render('saved');
});

app.get('/scrape', (req, res) => {
    axios.get('https://www.indeed.com/jobs?q=full+stack+developer&l=Portland%2C+OR').then((response) => {
        var $ = cheerio.load(response.data);
        var results = {};
        $('div.result').each((i, element) => {
            var jobTitle = $(element).find('a').attr('title');
            var link = 'https://indeed.com/' + $(element).find('a').attr('href');
            var company = $(element).find("span.company").text().slice(9);

            results.company = company;
            results.link = link;
            results.position = jobTitle;
            db.Job.create(results)
            .then((dbJob) => {
                console.log(dbJob);
            }).catch((err) => {
                return res.json(err);
            });
        });
        res.redirect('/');
    });
});

app.get('/api/jobs', (req, res) => {
    db.Job.find({}).then((dbJob) => {
        res.json(dbJob);
    })
});

app.get('/api/jobs/saved', (req, res) => {
    db.Job.find({ saved: true })
    .then(dbSavedJob => {
        res.json(dbSavedJob);
    })
})

app.get('/api/jobs/:id', (req, res) => {
    db.Job.find( { _id: req.params.id } ).then((dbJob) => {
        res.json(dbJob);
    })
});

app.post('/api/jobs/:id', (req, res) => {
    db.Job.findOneAndUpdate( { _id: req.params.id }, { $set: { saved: req.body.saved }}, (err, data) => {
        if (err) throw err;
    })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})