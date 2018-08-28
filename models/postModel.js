const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//design the two schema below and use sub docs 
//to define the relationship between posts and comments

let commentSchema = new mongoose.Schema({
    text: String,
    user: String
});

//post has a comment (subdoc)
let postSchema = new mongoose.Schema({
    text: String,
    comments: [commentSchema]
});

let Post = mongoose.model('post', postSchema);
let Comment = mongoose.model('comment', commentSchema);

module.exports = {
    Post : Post,
    Comment : Comment
};

