require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const ejs = require("ejs");
const assert =  require('assert');
const morgan =  require('morgan');

const app = express();
const port = process.env.PORT;
const databaseConnect= require("./database");
const userController = require("./routers/user")
const commentController = require("./routers/comment")
const postController = require("./routers/post")
const User = require('./models/user');

const LocalStrategy = require('passport-local').Strategy; 
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy(User.authenticate())); 
app.use(session({
    secret : process.env.PASS_SECRET,
    resave :false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/user',userController);
app.use('/posts',postController);
app.use('/comments',commentController);
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 



passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/posts",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, done) {
     // console.log(profile);
      User.findOne({
        'google_id': profile.id 
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            
            var usernameToPut = profile.displayName.split(' ').join('');
            usernameToPut +=  Date.now()
            user = new User({
                fullName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.displayName.split(' ').join(''),
                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                google_id: profile.id,
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
  }
));



app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile","email"] })
);
app.get('/auth/google/posts', 
  passport.authenticate('google', { failureRedirect: '/user/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/posts');
});



app.route("/")
    .get(function(req,res){
        res.render("loginregister");
    });


app.listen(port,function(req,res){
    console.log("Server started on port : " + port);
})











