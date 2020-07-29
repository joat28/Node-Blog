const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const Post = require('./../models/post');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


const LocalStrategy = require('passport-local').Strategy; 




passport.use(new LocalStrategy(User.authenticate())); 
router.use(session({
    secret : process.env.PASS_SECRET,
    resave :false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 






//------------------------------------------  CREATE ---------------------------------------------


router.route ("/register")
    .get(function(req,res){
        res.render('register');
    })
    .post(function(req,res){
    const newUser = new User({
        username:req.body.username,
        email: req.body.email,
        //password: req.body.password,
        fullName: req.body.fullName
    })
    // newUser.save(function(err, result){

    //     if(err){
    //         res.json({
    //             status:false,
    //             message: "failed to save data",
    //             error: err
    //         })
    //     }
    //     else{
    //         res.json({
    //             status:true,
    //             message: "Data saved",
    //             result: result
    //         })
    //     }
    // });

    User.register(newUser, req.body.password, function(error,result){
        if(error){
            res.json({
                status:false,
                message: "Error in registering user",
                error: error
            })
        }
        else{
            // res.json({
            //     status:true,
            //     message: "User saved in Data.."
            // })
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
            console.log("loggin in passed FIRST errors")
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
                console.log("basic errors checked");


                passport.authenticate("local")(req, res, function() {
                   res.redirect("/posts");
                });
                // passport.authenticate('local',{successRedirect:"/posts",failureRedirect:"user/login", failureFlash:true})

                // req.login(user, function(err){
                //  if(err){
                //     res.json({
                //         status:false,
                //         message: err
                //     })
                // } else{
                //     passport.authenticate('local',{request,response,function(){
                //         res.redirect("/posts")
                //     }})

                // }
                // })

            }
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













        // var password = req.body.password;
        // var email = req.body.email;
        // User.findOne({email:email},function(error,result){
        //     if(error){
        //         res.json({
        //             status:false,
        //             message:"Error in findOne Function",
        //             result:result,
        //         });
        //     }
        //     else if(result==null){
        //         res.json({
        //             status:false,
        //             message: "Unable to find the user using email"
        //         })
        //     }
        //     else{
        //         if(password == req.body.password){
        //             console.log("FOUND!!!!! USER CREDENTIALS CORRECT! ............");
        //             res.redirect("/posts")
        //             // res.json({
        //             // status: true,
        //             // message: "Login Success...",
        //             // result:result
        //             }
        //         else{
        //             res.json({
        //                 status: false,
        //                 message: "password did not match..."
        //             })
        //         }

        //     }
        // });   
    






//------------------------------------------------- READ ----------------------------------------------------------------

// router.route('/:user_id')
//     .get(function(req,res){
//         res.
//     })
















// router.get('/home',function(req,res){
//     Post.find(function(error,result){
//         if(error){
//             res.json({
//                 status:false,
//                 message:"Error in fetching data (find) ..."
//             })
//         }
//         else{
//             if(result==null){
//                 res.json({
//                     status:true,
//                     message: " No error in fetching but no posts found ..."
//                 })
                
//             }
//             else{
            
//             }
//         }
//     })
// })

// router.route(':user_id/posts/compose')
//     .get(function(req,res){
//         res.render('compose');
//     })
//     .post(function(req,res){
//         const newPost={
//             textfield:{
//                 title: req.body.blogTitle,
//                 content: req.body.blogContent
//             },

//             author:
//         }
//     })


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