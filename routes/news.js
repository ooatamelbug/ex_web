var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sohapp', { useNewUrlParser: true });
var db = mongoose.connection;

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var news = db.get('news');
    news.find({},{},function(err,news){
      res.render('news',{
          'news':news,
          'title':'NEWS'
      });
  });
});

module.exports = router;
