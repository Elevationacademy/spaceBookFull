const express = require('express')
const router = express.Router()
const {Post,Comment} = require('../../models/postModel');

// 1) to handle getting all posts and their comments
router.get('/posts', (req, res) =>{
  Post.find().exec(function(err, posts){
    
    res.send(posts);
  });  
});  

// 2) to handle adding a post
router.post('/posts', (req, res) =>{
  let {text} =  req.body;
  let newPost = new Post({
    text: text,
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
router.delete('/posts/:postID', (req, res) =>{
  let {postID} =  req.params;
  Post.findByIdAndRemove(postID)
  .exec(function(err, post) {
    if (err) {
      console.log(err);
    }
    console.log("deleted");
    res.send("post: "+postID+" deleted");
  });
}); 


// 4) to handle adding a comment to a post
router.post('/comments/:postID', (req, res) =>{
  Post.findById(req.params.postID, function(err, updatedPost){
    if(err){
      console.log(err);
    }
    updatedPost.comments.push(req.body); 
    Post.findByIdAndUpdate(req.params.postID,updatedPost, function(err, result){
      if(err){
        console.log(err);
      }
      res.send(result);
    });
  });
});

// 5) to handle deleting a comment from a post
router.delete('/comments/:postID/:commentID', (req, res) =>{
  let {postID,commentIndex}  = req.params;
 
  Post.findById(postID, function(err, updatedPost){
    if(err){
      console.log(err);
    }
    updatedPost.comments.splice(commentIndex, 1);
    Post.findByIdAndUpdate(postID,updatedPost, function(err, result){
      if(err){
        console.log(err);
      }
      res.send(updatedPost);
    });
  });
});

//Use this chunk of code to improve mogno work.
// router.post('/comment', (req, res ) => {
//   Post.findByIdAndUpdate(req.body.postId, 
//     {$push: 
//       { comments: 
//         {text: req.body.text,
//          user: req.body.user}
//       }
//     }, {new: true}, (err, post) => {
//     if (err) throw err;
//     else {res.send(post)}
//     })
//   })

// router.delete('/deletecomment', (req, res) => {
//   Post.findByIdAndUpdate(req.body.postId, 
//     {$pull: 
//       {comments: {
//         _id: req.body.commentId}
//       }
//     }, {new: true}, (err, post) => {
//       if (err) throw err;
//       else res.send(post)
//     })
//   })

module.exports = router