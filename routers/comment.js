const router = require('express').Router();
const bodyParser = require('body-parser');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
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






router.route("/")
    .get(function(req, res){
        Comment.find(function(error,result){
            if(error){
                res.json({
                    status: false,
                    message: "Error in finding All comments"
                })
            }
            else{
                res.json({
                    status: true,
                    message: "Comments Found successfully",
                    result: result
                })
            }
        })
    })
    .delete( function(req,res){
        res.json({
            status: false,
            message: "Delete all is not allowed",
        }) 
    })
    .put(function(req,res){
        res.json({
            status: false,
            message: "Put all is not allowed"
        })
    })
    .patch(function(req,res){
        res.json({
            status: false,
            message: "Patch all is not allowed"
        })
    })



router.route("/:comment_id")
    .get(function(req,res){
        Comment.findById(req.params.comment_id, function(error, result){
            if(error){
                res.json({
                    status: false,
                    message: "Error in finding the Comment"
                })
            }
            else if(result == null){
                res.json({
                    status:false,
                    message: "No comment found with this Id",
                    result: result
                })
            }
            else {
                res.json({
                    status: true,
                    message :  "Comment found successfully",
                    result: result
                })
            }
            
        })
    })
    .delete( function(req,res){
        Comment.findByIdAndDelete(req.params.comment_id, function(error, result){
            if(error){
                res.json({
                    status: false,
                    message: "Error in Deleting the Comment"
                })
            }
            else{
                Comment.findByIdAndDelete(req.params.comment_id,function(error,result){
                    if(error){
                        res.json({
                            status: false,
                            message: "Error in deleting the comment or Null result",
                            error: error
                        })
                    }
                    else{
                        res.json({
                            status: true,
                            message : "Comment deleted successfully",
                        })
                    }
                })

            }
        })
    })
    .patch(function(req,res){
        if(!req.user){
            res.json({
                status: false,
                message: "Permission Denied, Login first"
            })
        }
        else{
            Comment.findOneAndUpdate({_id: req.params.comment_id},{$set:req.body},{new: true}, function(error,result){
                    if(error || !result){
                        res.json({
                            status: false,
                            message: "Error in Updating the Comment",
                            error: error
                        })
                    }
                    else{
                        res.json({
                            status: true,
                            message: "Comment updated successfully",
                            result: result
                        })
                    }
            })
        }
    })
    .put(function(req,res){
        if(!req.user){
            res.json({
                status: false,
                message: "Permission Denied, Login First"
            })
        }
        else{
            res.json({
                status: false,
                message : "PUT is not allowed"
            })
        }
    })








////////// Override get for deleting //////////
router.route('/:post_id/:comment_id/delete')
    .get(function(req,res){
        Comment.findByIdAndDelete(req.params.comment_id,function(error,result){
            if(error){
                res.json({
                    status: false,
                    message: "Error in deleting the comment",
                    error: error
                })
            }
            else{
                var redirect_link = "/posts/" + req.params.post_id;
                res.redirect(redirect_link);
            }
        })
    })
    

module.exports = router;