const router = require('express').Router();
const bodyParser = require('body-parser');
const Post = require('./../models/post');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.route("/")
    .get(function(req,res){
        Post.find(function(error,blogArray){
            if(error){
                res.json({
                    status:false,
                    message:"error in rendering posts in /posts route" 
                })  
            }
            else if(blogArray.length==0){
                res.json({
                    status: false,
                    message:"No posts found, BlogArray is empty"
                });

            }
            else{
                res.render('index',{blogArray:blogArray});
            }
        })
    });






router.route('/compose')
    .get(function(req,res){
        res.render('compose');
    })
    .post(function(req,res){
        var blogTitle = req.body.blogTitle;
        var blogContent = req.body.blogContent;
        const newBlog = new Post({
            textfield:{
                blogTitle:blogTitle,
                blogContent:blogContent
            },
            author: "key not used until now"
         })
        newBlog.save(function(error, result){
            if(error){
                res.json({
                    status:false,
                    message:"Post was not saved due to error.."
                })

            }
            else{ 
                res.redirect('/posts')
            }
        })
    })

router.route('/:post_id')
    .get(function(req,res){
        Post.findById(req.params.post_id, function(error,result){
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
                // res.json({
                //     status:true,
                //     message:"Post found and will be rendered..."
                // })
                res.render('readpost',{blogToRender:result});
            }
        })  
    })

router.route('/:post_id/delete')
    .get(function(req,res){
        Post.findByIdAndDelete(req.params.post_id, function(error,result){
            if(error){
                res.json({
                    status: true,
                    message: "Error in deletion"
                })
            }
            else{
                res.redirect('/posts');
            }
        })
        
    })
router.route('/:post_id/edit')
    .get(function(req, res){
        Post.findById(req.params.post_id,function(error ,result){
            if(error||result==null){
                res.json({
                    status:false,
                    message: "Error in rendering edit page Or null"
                })
            }
            else{
                res.render('editAndReplace',{blogObject:result});
            }
        })
    })
    .post(function(req,res){
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

    })









module.exports = router

