const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const Post = require('./../models/post');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


const LocalStrategy = require('passport-local').Strategy; 
const GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.use(new LocalStrategy(User.authenticate())); 
router.use(session({
    secret : process.env.PASS_SECRET,
    resave :false,
    saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "https://localhost:3000/user/auth/google/posts",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));






//------------------------------------------  CREATE ---------------------------------------------



router.route("/")
    .get(function(req,res){
        User.find(function(error,result){
            if(error){
                res.json({
                    status: false,
                    message: "Error in finding Users",
                    error: error
                })
            }
            else{
                res.json({
                    status: true,
                    message: "Users found Successfully",
                    result: result
                })
            }
        })
    });
    // .delete(function(req,res){
    //     if(!req.user){
    //         res.json({
    //             status: false,
    //             message: "Login required"
    //         })
    //     }
    //     else()
    // })


router.route ("/register")
    .get(function(req,res){
        res.render('register');
    })
    .post(function(req,res){
    const newUser = new User({
        username:req.body.username,
        email: req.body.email,
        fullName: req.body.fullName
    })
    User.register(newUser, req.body.password, function(error,result){
        if(error){
            res.json({
                status:false,
                message: "Error in registering user",
                error: error
            })
        }
        else{
            res.redirect('/user/login');
        }
    })
})


router.route ("/login",)
    .get(function(req,res){
        res.render('login');
    })
    .post(passport.authenticate('local'),function(req,res){
        if(!req.body.username){
         //   console.log("loggin in passed FIRST errors")
            res.json({
                status:false,
                message: "No username provided"
            })   
        }
        else{
            if(!req.body.password){
                res.json({
                    status:false,
                    message: "No password provided"
                })
            }
            else{
             //   console.log("basic errors checked");


                passport.authenticate("local")(req, res, function() {
                   res.redirect("/posts");
                });

            }
        }
    })



router.route('/myposts')
    .get(function(req,res){
        if(!req.user){
            res.redirect('/user/login')
        }

        else{
            
            User.findById(req.user._id).populate('personal').exec(function(error,result){
                if(error){
                    res.json({
                        status :false,
                        message: "Error in finding and populating"
                    })

                }
                else{
                    res.render('myblogs',{userObject:result})
                }
            })
         }
    })


router.route('/profile')
    .get(function(req,res){
        if(req.user){
            res.render('profile',{userObject:req.user});
        }
        else
        {
            res.redirect('/login');
        }
    })
router.route('/logout')
    .get(function(req,res){
        req.logout();
        res.redirect("/")
    })

//---------------------------------------- DELETE ----------------------------------------------------------------
router.route('/delete')
    .get(function(req,res){
        User.deleteOne({_id:req.user._id},function(error,result){
            if(error){
                res.json({
                    status:false,
                    message:"Error in deleting the User",
                    error:error
                })
            }
            else{
                res.redirect("/");
            }
        })
    })

module.exports = router;