var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrat = require('passport-local').Strategy;
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var session =require('express-session');
var expMessages = require('express-messages');
var multer = require('multer');
var upload = multer({dest:'./public/images/uploads'});
var moment = require('moment');
var db = require('monk')('localhost/sohapp');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var profileRouter= require('./routes/profile');
var userRouter= require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//handel ecpress-session
app.use(session({
    secret :'secret',
    saveUninitialized:true,
    resave : true
}));

//handel passport
app.use(passport.initialize());
//handel passport-session 
app.use(passport.session());
//handel express validator
app.use(expressValidator({
    errorFormatter:function(param,msg,value){
        var nameSpace = param.split('.'),
            root = nameSpace.shift(),
            formParam = root;
        while(nameSpace.length){
            formParam += '[' + nameSpace.shift() + ']';
        }
            return{
                param:formParam,
                msg :msg,
                value :value
            }
    }
}));
//handel flash
app.use(flash());
//handel expMessages
app.use(function(req, res, next){
    res.locals.messages = expMessages(req, res);
    next();
});

//handel bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : false
}));


app.get('*',function(req,res,next){
    res.locals.user = req.user || null;
    next();
});


app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/profile',profileRouter);
app.use('/user',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
