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
const postController = require("./routers/post")






app.use(session({
    secret : process.env.PASS_SECRET,
    resave :false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/user',userController);
app.use('/posts',postController);
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//

//const blogArray=[];


    // ===================== INDEX ROUTE =========================

app.route("/")
    .get(function(req,res){
        res.render("loginregister");
    });



//     //===================== COMPOSE ROUTE ========================
   
// app.route("/compose")
//     .get(function(req,res){
       
//         res.render("compose");
        
//     })
//     .post(function(req,res){
//        // console.log(req.body);
//         const blog={
//             id:blogArray.length,
//             blogTitle:req.body.blogTitle,
//             blogContent:req.body.blogContent,
//         }
//         blogArray.push(blog);
//         //console.log(blogArray);
//         res.redirect("/");
//     });




//      //===================== EDIT/READ ROUTE ===========================


// app.route("/readpost/:blog_Id")
//     .get(function(req,res){

//         var blogID=req.params.blog_Id;
//         var blogToRender;
//         for(var i=0;i<blogArray.length;++i){
//             if(blogArray[i].id == blogID){
//                 blogToRender = blogArray[i];
//                 console.log("found!!!!!!");
//                 break;
//             }

//             //console.log(blogArray[i]);
//         }
//         //console.log(blogToRender);
//         res.render("readpost",{blogToRender:blogToRender});

//         if(document.getElementById("delete-button").clicked == "true"){
//             blogArray[i]=null;
//             res.redirect("/");
          
//         }
        
//     });


//     // str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');



//     app.route("/editAndReplace/:blog_Id")
//     .get(function(req,res){

//         var blogID=req.params.blog_Id;
//         var blogToRender;
//         for(var i=0;i<blogArray.length;++i){
//             if(blogArray[i].id == blogID){
//                 blogToRender = blogArray[i];
//                 console.log("found!!!!!!");
//                 break;
//             }

//             //console.log(blogArray[i]);
//         }
//         //console.log(blogToRender);
//         const newBlog={
//             id:blogID,
//             blogTitle:req.body.blogTitle,
//             blogContent:req.body.blogContent
//         };
        
        
//     });




//      //====================== ABOUT ROUTE ==========================


// app.route("/about")
//     .get(function(req,res){
//         res.render("about");
//     });


//      //====================== CONTACT ROUTE==========================



// app.route("/contact")
//     .get(function(req,res){
//         res.render("contact");
//     });





//      //====================== LISTEN TO PORT 3000 ====================

app.listen(port,function(req,res){
    console.log("Server started on port : " + port);
})











