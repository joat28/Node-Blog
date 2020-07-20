const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
const blogArray=[];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



    //===================== INDEX ROUTE =========================

app.route("/")
    .get(function(req,res){
        res.render("index",{blogArray:blogArray});
    });



    //===================== COMPOSE ROUTE ========================
   
app.route("/compose")
    .get(function(req,res){
        res.render("compose");
    })
    .post(function(req,res){
       // console.log(req.body);
        const blog={
            id:blogArray.length,
            blogTitle:req.body.blogTitle,
            blogContent:req.body.blogContent,
        }
        blogArray.push(blog);
        //console.log(blogArray);
        res.redirect("/");
    });




     //===================== EDIT/READ ROUTE ===========================


app.route("/readpost/:blog_Id")
    .get(function(req,res){

        var blogID=req.params.blog_Id;
        var blogToRender;
        for(var i=0;i<blogArray.length;++i){
            if(blogArray[i].id == blogID){
                blogToRender = blogArray[i];
                console.log("found!!!!!!");
                break;
            }

            //console.log(blogArray[i]);
        }
        //console.log(blogToRender);
        res.render("readpost",{blogToRender:blogToRender});
        
    });


    // str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');




     //====================== ABOUT ROUTE ==========================


app.route("/about")
    .get(function(req,res){
        res.render("about");
    });


     //====================== CONTACT ROUTE==========================



app.route("/contact")
    .get(function(req,res){
        res.render("contact");
    });





     //====================== LISTEN TO PORT 3000 ====================

app.listen(3000,function(req,res){
    console.log("Server started on port 3000!");
})











