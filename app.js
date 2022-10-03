//jshint esversion:6
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my blogsite.Here I will upload my blogs daily.Blogs on different topics like Technology,Finance etc will be uploaded here.Feel free to contact me if you have any concern.Enjoy!!";
const aboutContent = "My name is Rajat mehta. I'm passionate about Technology.";
const contactContent = "Page under construction.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect("mongodb+srv://admin-rajat:rajat@cluster0blogsite.amser.mongodb.net/blogDB");

const blogSchema = {
  title: String,
  content:String
};

const Post = new mongoose.model("Post",blogSchema);


app.get("/", function(req, res){

Post.find({},function(err,posts){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
})


});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/delete" function(req,res){

});

app.post("/compose", function(req, res){

const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

post.save();
  res.redirect("/");

});



app.get("/posts/:postID", function(req, res){
  const requestedID = req.params.postID;

  Post.findOne({ _id: requestedID},function(err,post){
    if(!err){
      res.render("post", {title:post.title,content:post.content});
    }
  });



});

app.listen(process.env.PORT || 4000);
