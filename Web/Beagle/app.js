var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var CORS = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

mongoose.connect('mongodb://<Removed>:<Removed>@kahana.mongohq.com:<Removed>');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
});

//Set headers for CORS
app.all('*',  function (req, res, next) {
    if (req.headers.origin == null);
    else if (req.headers.origin.indexOf("localhost") != -1) 
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7888');
     else if (req.headers.origin.indexOf("104.131.30.72") != -1) {
        if (req.headers.origin.indexOf("https") !=-1) 
            res.setHeader('Access-Control-Allow-Origin', 'https://104.131.30.72');
        else if (req.headers.origin.indexOf("http") != -1) 
            res.setHeader('Access-Control-Allow-Origin', 'http://104.131.30.72');
        
     }
    else if (req.headers.origin.indexOf("ngrok") != -1) 
         res.setHeader('Access-Control-Allow-Origin', 'http://5eeff2d4.ngrok.com');
    else if (req.headers.origin.indexOf("https") > -1 && req.headers.origin.indexOf("www") > -1)
        res.setHeader('Access-Control-Allow-Origin', 'https://www.inqora.com');
    else if (req.headers.origin.indexOf("https") > -1)
        res.setHeader('Access-Control-Allow-Origin', 'null');
    else if (req.headers.origin.indexOf("http") > -1 && req.headers.origin.indexOf("www") > -1)
        res.setHeader('Access-Control-Allow-Origin', 'http://www.inqora.com');
    else if (req.headers.origin.indexOf("http") > -1)
        res.setHeader('Access-Control-Allow-Origin', 'http://inqora.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//Random Express setup stuff
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ALL GET AND POST API's HERE
app.get('/:whatever', function (req, res) {
    if(req.params.whatever.length > 0)
    res.redirect("http://localhost:3000/")
});

app.get('/api/getdemo', function (req, res) {
    find('Demo', {}, function (err, docs) {
        console.dir(docs);
        res.send(docs);
    });
});

function find(collec, query, callback) {
    mongoose.connection.db.collection(collec, function (err, collection) {
        collection.find(query).toArray(callback);
    });
}

//END API's

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//app.listen(process.env.PORT || 3000);

module.exports = app;
