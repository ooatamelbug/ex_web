var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrat = require('passport-local').Strategy;
var User = require('../module/user.js');

router.get('/regester',function(req,res,next){
    res.render('regester',{
        title:'REGESTER'
    });
});

router.get('/login',function(req,res,next){
    res.render('login',{
        title:'LOGIN'
    });
});

router.post('/regester',function(req,res,next){
    if(req.body){
        var userName        = req.body.username;
        var userPassword    = req.body.password;
        var userEmail       = req.body.email;   
    }
    
    if(req.files){
        var imageOriginalName = req.files.profimg.originalname;
        var imageName = req.files.profimg.name;
        var imageMimeType = req.files.profimg.mimetype;
        var imagePath = req.files.profimg.path;
        var imageExtenion = req.files.profimg.extenion;
        var imageSize = req.files.profimg.size;
    }else {
        var imageName = profile.jpg;
    }
    req.checkBody('userName','username not empty').notEmpty();
    req.checkBody('userPassword','password not empty').notEmpty();
    req.checkBody('userEmail','Email not empty').notEmpty();
    req.checkBody('userEmail','Email is not email').isEmail();

    var errors = vaildationErrors();
    if(errors){
        res.render('regester',{
            errors:errors,
            username:userName,
            password:userPassword,
            email:userEmail
        });
    }else {
        var newUserReg = new User({
            username:userName,
            password:userPassword,
            email:userEmail,
            image:imageName,
            datereg:new Date(),
            userGroup:0
        });
        User.createUser(newUserReg,function(err,user){
            if(err) throw err;
            console.log(user);
        });
        req.flash('success','you regester now');
        res.location('/profile');
        res.redirect('/profile');
    }
    
});

/*passport.serializeUser(function(user,done){
    done(null,user.id);
});*/
/*passport.deserializeUser(function(id,done){
    User.getUserById(id,function(err,user){
        done(err,user);
    });
});*/

passport.use(new localStrat(function(username,password,done){
    User.getUserByUsername(username,function(err,user){
        if(err) throw err;
        if(!user){
            console.log('unknown user');
            return done(null,false,{message:'unknown user'});
        }
        User.comparePassword(password,user.password,function(err,isMatch){
            if(err) throw err;
            if(isMatch){
                return done(null,user);
            }else {
                console.log('invalide password');
             return done(null,false,{message:'unknown password'});               
            }
        });
    });
}));

router.post('/login',passport.authenticate('local',{failureRedirect:'/user/login',failureFlash:'invalide username or password'}),function(req,res){
    console.log('authencation yes');
    req.flash('success','you login');
    res.redirect('/profile');
});
    
router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','you now logout');
    res.redirect('/');
});
    
    
module.exports = router;