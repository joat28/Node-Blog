const router = require('express').Router();
const bodyParser = require('body-parser');
const Post = require('./../models/post');
const User = require('./../models/user');
const Comment = require('./../models/comment');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const path = require('path');

///File Upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
       // console.log(file);
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });



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
    .get(function(req,res){

        if(!req.user){
            res.redirect("/user/login");
        }
        else{
           
            Post.find().populate('author').exec(function(error,blogArray){
                if(error){
                    res.json({
                        status:false,
                        message:"error in rendering posts in /posts route" ,
                        error:error
                    })  
                }
                else if(blogArray.length==0){
                    res.json({
                        status: false,
                        message:"No posts found, BlogArray is empty"
                    });
                }
                else{
                   // console.log("REQUSER IN /POSTS: ------->" + req.user._id);
                    res.render('index',{blogArray:blogArray});
                    // res.json({
                    //     status: true,
                    //     message: "All posts found",
                    //     result: blogArray
                    // })
                }
            })
        }
        
    })
    .post(function(req,res){
        res.json({
            status: false,
            message: "Cannot give Post request to /posts"
        })
    })
    .delete(function(req,res){
        res.json({
            status: false,
            message: "Cannot give Delete request to /posts, All posts can't be deleted "
        })
    })
    .put(function(req,res){
        res.json({
            status: false,
            message: "Cannot give Put requests to /posts route"

        })
    })
    .patch(function(req,res){
        res.json({
            status: false,
            message: "Cannot give Patch requests to /posts route"
        })
    })



router.route('/compose')
    .get(function(req,res){
        if(!req.user){
            res.redirect("/user/login");
        }
        else{
            res.render('compose');
        }
        
    })
    .post(upload.single('blogImage'), function(req,res){
        if(!req.user){
            res.redirect("/user/login");
        }
        else{
            // console.log( req.file);
            
            var blogTitle = req.body.blogTitle;
            var blogContent = req.body.blogContent;
            
            var newBlog = new Post({
                textfield:{
                    blogTitle:blogTitle,
                    blogContent:blogContent
                },
                author: req.user._id,
             })

            if(req.file){
                 newBlog = new Post({
                    textfield:{
                        blogTitle:blogTitle,
                        blogContent:blogContent
                    },
                    author: req.user._id,
                    image_id:req.file.filename
                 })
            }
            
            
            console.log(newBlog);
            newBlog.save(function(error, result){
                if(error){
                    res.json({
                        status:false,
                        message:"Post was not saved due to error..",
                        error: error
                    })
                }
                else{
                    User.findByIdAndUpdate(req.user._id, {$push:{personal:newBlog._id}},function(error,result){
                        if(error){
                            res.json({
                                status:false,
                                message: "Blog created, but unable to push into personal array!",
                                error: error
                            })
                        }
                        else{
                            res.redirect('/posts')
                        }
                    })   
                }
            })
        }
    })


router.route('/:post_id')
    .get(function(req,res){
        if(!req.user){
            res.redirect("/user/login");
        }
        else{
            
            Post.findOne({_id:req.params.post_id}).populate({
                path:'comments',
                populate:{
                    path:'given_by'
                }   
            }).exec(function(error,result){
                if(error){
                    res.json({
                        status:false,
                        message:"Error in reading a particular post..."
                    })
                }
                else if(result==null){
                    res.json({
                        status:false,
                        message:"Post was not found..."
                    })
                }
                else{
                   res.render('readpost',{blogToRender:result, curr_user_id:req.user._id});
                    
                }
            })  
        }
    })
    ///////// REST API DELETE //////////////////////////////////
    .delete( function(req,res){
        if(!req.user){
            res.json({
                status:false,
                message: "Authentication Error!, Please Login or Signup First!"
            })
        }
        else{
            //CHECK PERMISSIONS TO DELETE
            Post.findOneAndDelete({_id: req.params.post_id, author:req.user._id}, function(error,result){
                if(error){
                    res.json({
                        status: true,
                        message: "Error in deleting Document!",
                        error: error
                    })
                }
                else if(result== null){
                    res.json({
                        status:false,
                        message: "Permission Denied or No result found"    
                    })
                }
                else{
                    res.json({
                        status: true,
                        message: "Deleted Successfully"
                    })
                }
            })
        }
    })
    /// REST API PATCH/// 
    .patch(function(req,res){
        if(!req.user){
            res.json({
                status: false,
                message: "Permission denied"
            })
        }
        else{
            if(req.body._id || req.body.google_id){
                res.json({
                    status: false,
                    message: "IDs can't be changed, change only text fields"
                })
            }
            else{
                Post.update({_id:req.params.post_id}, {$set: req.body}, function(error, result){
                    if(error){
                        res.json({
                            status: false,
                            message: "Error in Updating document",
                            error: error
                        })
                    }
                    else if(result == null){
                        res.json({
                            status: false,
                            message: "No post found with this Id",
                            result: result
                        })
                    }
                    else{
                        res.json({
                            status: true,
                            message: "Post Updated",
                            result: result
                        })
                    }
                })
            }
        }
    })
    .put(function(req,res){
        res.json({
            status:false,
            message: "Put is not supported! (It overwrites Comments section)"
        })
    })


router.route('/:post_id/:image_id')
    .get(function(req,res){
        if(req.params.image_id == "DNE"){
            res.json({
                status: false,
                message: "No Image is uploaded with this blog",
            })
        }
        res.sendFile(path.join(__dirname , '../uploads/' + req.params.image_id))
    })







/////////////// Overriding Delete and Patch using post requests for webpage //////////////    

router.route('/:post_id/delete')
    .get(function(req,res){
        if(!req.user){
            res.redirect("/user/login");
        }
        else{
            //CHECK PERMISSIONS TO DELETE
            
            Post.findOneAndDelete({_id: req.params.post_id, author:req.user._id}, function(error,result){
                if(error){
                    res.json({
                        status: true,
                        message: "Error in deletion!"
                    })
                }
                
                else if(result== null){
                    res.json({
                        status:false,
                        message: "Permission Denied or No result found"

                    })
                }
                
                else{
                    res.redirect("/posts");
                }
            })
        }

    })
router.route('/:post_id/edit')
    .get(function(req, res){
        if(!req.user){
            res.redirect("/user/login");
        }
        else{
            
            Post.findOne({_id: req.params.post_id, author:req.user._id},function(error ,result){
                if(error){
                    res.json({
                        status:false,
                        message: "Error in rendering edit page Or null"
                    })
                }
                else if(result == null){
                    res.json({
                        status: false,
                        message: "Permission Denied Or result Null"
                    })
                }
                else{
                   
                    res.render('editAndReplace',{blogObject:result});
                }
            })
        }
    })
    .post(function(req,res){
        if(!req.user){
            res.redirect("/user/login");
        }
        else{  
            Post.updateOne({_id:req.params.post_id},{textfield:req.body}, function(error,result){
                if(error){
                    res.json({
                        status: false,
                        message: "Error in Updating document! or Null result "
                    })
                }
                else{
                    res.redirect('/posts')
                }
            })
        }

    })


router.route('/:post_id/comment/add')
    .post(function(req,res){
        
                            if(!req.user){
                                res.redirect("/login")
                            }
                            else{    
                            Post.findById(req.params.post_id,function(error, result){
                                if(error){
                                    res.json({
                                        status: false,
                                        message: " Error in finding Post to comment! "
                                    })
                                } 
                                
                                else{
                                        const newComment = new Comment({ 
                                            textfield: req.body.addComment,
                                            given_by:req.user._id,
                                            given_to: result.author._id
                                        })
                                        newComment.save(function(error,result1){
                                            if(error){
                                                res.json({
                                                    status: false,
                                                    message :"Error in saving the newComment!",
                                                    error: error
                                                })
                                            }
                                            else{

                                                    
                                                result.comments.push(newComment._id);
                                                result.save(function (err,result){
                                                    if(error){
                                                        res.json({
                                                            status:false,
                                                            message: "Error in pushing comment to the specific Post!.."
                                                        })
                                                    }
                                                });


                                                var redirectPath = "/posts/" + req.params.post_id
                                                res.redirect(redirectPath);
                                            }
                                        })

                                    }
                                })
                            }
        })       

    
                                

          
    
module.exports = router

