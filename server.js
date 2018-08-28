var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
console.log("DB connection established!!!");
})

// deconstruct
var {Post,Comment} = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// You will need to create 5 server routes
// These will define your API:



app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});

// 1) to handle getting all posts and their comments
app.get('/posts', (req, res,err) =>{
  let posts;
  if (err) {
    console.log(err);
  }
  Post.find().exec(function(err, posts){
    if (err){
      console.log('err to return posts: '+err);
    }
    //console.log('return all the posts and their comments');
    res.send(posts);
  });  
});  


// 2) to handle adding a post
app.post('/add-new-post', (req, res,err) =>{
  if (err) {
    console.log(err);
  }
  let newPost = new Post({
    text: req.body.text ,
    comments: []
  });
  newPost.save((err,data)=>{
    if (err) {
      console.log(err);
    }
    res.json(data);
  }); 
});


// 3) to handle deleting a post
app.delete('/delete-post/:postID', (req, res,err) =>{
  if (err) {
    console.log(err);
  }
  Post.findByIdAndRemove(req.params.postID)
  .exec(function(err, post) {
    if (err) {
      console.log(err);
    }
    console.log("deleted");
    res.json("post: "+req.params.postID+" deleted");
  });
}); 

// 4) to handle adding a comment to a post
app.post('/add-new-comment/:postID', (req, res,err) =>{
  if (err) {
    console.log(err);
  }
  Post.findById(req.params.postID, function(err, result){
    if(err){
      console.log(err);
    }
    result.comments.push(req.body);
    let updatedPost = result;
    Post.findByIdAndUpdate(req.params.postID,updatedPost, function(err, result){
      if(err){
        console.log(err);
      }
      res.send(updatedPost);
    });
  });
});

// 5) to handle deleting a comment from a post
app.delete('/delete-comment/:postID/:commentID', (req, res,err) =>{
  let {postID,commentIndex}  = req.params;
  if (err) {
    console.log(err);
  }
  Post.findById(postID, function(err, result){
    if(err){
      console.log(err);
    }
    result.comments.splice(commentIndex, 1);;
    let updatedPost = result;
    Post.findByIdAndUpdate(postID,updatedPost, function(err, result){
      if(err){
        console.log(err);
      }
      res.send(updatedPost);
    });
  });
});






// create dummy data

//create post 1
let post1 = new Post({
  text: 'I am post 1',
  comments: []
  
});

// create comment to post 1
let comment11 = new Comment({
  text: 'I am the comment of post 1',
  user: 'Hilla'
});


//push the comment to post 1 array
post1.comments.push(comment11);

//save it to the DB
// post1.save((err,data)=>{
//   if (err) {
//     console.log(err);
//   }
//   console.log("post:"+data);
// });

// same for port 2
let post2 = new Post({
  text: 'I am post 2',
  comments: []
  
});

let comment21 = new Comment({
  text: 'I am the comment of post 2',
  user: 'Kate'
});

post2.comments.push(comment21);

// post2.save((err,data)=>{
//   if (err) {
//     console.log(err);
//   }
//   console.log("post2:"+data);
// });
