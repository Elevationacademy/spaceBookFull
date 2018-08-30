/**
* @class Responsible for storing and manipulating Spacebook posts, in-memory
*/
class PostsRepository {
    constructor() {
        this.posts = [];
    }
    
    addPost(post) {
        this.posts.push(post);
    }
    
    _findIndexByPostID (postID){
        for (let p in this.posts) {
            if (this.posts[p]._id == postID){
                return p;
            }
        }
    } 
    _findIndexByCommentID (commentID){
        for (let p of this.posts) {
            for (let c in p.comments) {
                if (p.comments[c]._id == commentID){
                    return c;
                }
            }
        }
    } 
    removePost(postID) {
        let postIndex = this._findIndexByPostID(postID)
        this.posts.splice(postIndex, 1);
    }
    
    addComment(newComment, postID) {
        let postIndex = this._findIndexByPostID(postID);
        this.posts[postIndex].comments.push(newComment);
    };
    
    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
    };
    
    // ajax
    utilAjax(url,method){
        return $.ajax({
            url: url,
            method: method,
        }).catch((err)=>{
            alert("Oops!!");
            console.log('Error:something wrong happan during ajax GET request');
        });
    };
    
    postAjax(url,method,data){
        return $.ajax({
            url: url,
            method: method,
            data:data,
            dataType:"json",
        })
        .catch((err)=>{
            alert("Oops!!");
            console.log('Error:something wrong happan during ajax GET request');
        });
    };
}

export default PostsRepository;