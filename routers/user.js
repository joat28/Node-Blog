const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const Post = require('./../models/post');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));







//------------------------------------------  CREATE ---------------------------------------------


router.route ("/register")
    .get(function(req,res){
        res.render('register');
    })
    .post(function(req,res){
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName
    })
    newUser.save(function(err, result){

        if(err){
            res.json({
                status:false,
                message: "failed to save data",
                error: err
            })
        }
        else{
            res.json({
                status:true,
                message: "Data saved",
                result: result
            })
        }
    });
})


router.route ("/login")
    .get(function(req,res){
        res.render('login');
    })
    .post(function(req,res){
        var password = req.body.password;
        var email = req.body.email;
        User.findOne({email:email},function(error,result){
            if(error){
                res.json({
                    status:false,
                    message:"Error in findOne Function",
                    result:result,
                });
            }
            else if(result==null){
                res.json({
                    status:false,
                    message: "Unable to find the user using email"
                })
            }
            else{
                if(password == req.body.password){
                    console.log("FOUND!!!!! USER CREDENTIALS CORRECT! ............");
                    res.redirect("/posts")
                    // res.json({
                    // status: true,
                    // message: "Login Success...",
                    // result:result
                    }
                else{
                    res.json({
                        status: false,
                        message: "password did not match..."
                    })
                }

            }
        });   
    });






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





module.exports = router;