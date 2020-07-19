const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();






const blogArray=[];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.route("/")
    .get(function(req,res){
        res.render("index",{blogArray:blogArray});
    });
   
app.route("/compose")
    .get(function(req,res){
        res.render("compose");
    })
    .post(function(req,res){
       // console.log(req.body);
        
        blogArray.push(req.body);
        //console.log(blogArray);
        res.redirect("/");
    });
app.route("/edit")
    .get(function(req,res){
        res.render("edit");
    });

app.route("/about")
    .get(function(req,res){
        res.render("about");
    });
app.route("/contact")
    .get(function(req,res){
        res.render("contact");
    });

app.listen(3000,function(req,res){
    console.log("Server started on port 3000!");
})











