//var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sohapp', { useNewUrlParser: true });
var db = mongoose.connection;
//var db = require('monk')('localhost/sohapp/users');
var passport = require('passport');
var localStrat = require('passport-local').Strategy;

var UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String,
        bcrypt:true,
        require:true
    },
    email:{
        type:String
    },
    img:{
        type:String
    },
    datereg: {
        type:Date
    },
    userGroup:{
        type:Number
    }
});
var User = module.exports = mongoose.model('User',UserSchema);

/*module.exports.createUser = function(newUser,callback){
    bcrypt.hash(newUser.password, 10,function(err, hash){
        if(err) throw err;
        
        newUser.password = hash;
        
        newUser.save(callback);
    });
};*/
module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) return callback(err);
        callback(null,isMatch);
    });
};

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};

module.exports.getUserByUsername = function(username,callback){
    var quer = {username:username};
    User.findOne(quer,callback);
};

module.exports.comparePassword = function(userPassword,hash,callback){
    bcrypt.compare(userPassword,hash,function(err,isMatch){
        if(err) return callback(err);
        callback(null,isMatch);
    });
    User.findOne(quer,callback);
};