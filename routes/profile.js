var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrat = require('passport-local').Strategy;

router.get('/',function(req,res,next){
    res.render('profile',{
        title:'PROFILE'
    });
});



module.exports = router;