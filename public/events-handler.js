class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }
    
    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else {
                this.postsRepository.postAjax("/posts","POST",{text: $input.val()})
                .then((data)=>{
                    this.postsRepository.addPost(data);
                    this.postsRenderer.renderPosts(this.postsRepository.posts);
                })
                $input.val("");
            }
        });        
    }
    
    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let postID = $(event.currentTarget).closest('.post').attr("post-id");
            this.postsRepository.utilAjax("/posts/"+postID,"DELETE")
            .then((data)=>{
                this.postsRepository.removePost(postID);
                this.postsRenderer.renderPosts(this.postsRepository.posts);
                console.log(data);
            })
        });
        
    }
    
    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
        });
    }
    
    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
            if ($comment.val() === "" || $user.val() === "") {
                alert("Please enter your name and a comment!");
                return;
            }
            let postID = $(event.currentTarget).closest('.post').attr("post-id");
            let postIndex = this.postsRepository._findIndexByPostID(postID);
            let newComment = { text: $comment.val(), user: $user.val() };
            this.postsRepository.postAjax("/comments/"+postID,"POST",newComment)
            .then((data)=>{
                //alert("data:"+JSON.stringify(data.comments[data.comments.length-1]));
                this.postsRepository.addComment(data.comments[data.comments.length-1], postID);
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
            })
            .catch((err)=>{
                alert("Oops cannot add comment!!");
                alert(err);
                console.log(err);
                console.log('Error:something wrong happan during ajax GET request');
            });
            $comment.val("");
            $user.val("");
        });
        
    }
    
    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postID = $(event.currentTarget).closest('.post').attr("post-id");
            let commentID = $(event.currentTarget).closest('.comment').attr("comment-id");
            let postIndex =  this.postsRepository._findIndexByPostID(postID);
            let commentIndex =  this.postsRepository._findIndexByCommentID(commentID);
            //alert(commentID);
            this.postsRepository.utilAjax("/comments/"+postID+"/"+commentIndex,"DELETE")
            .then((data)=>{
                this.postsRepository.deleteComment(postIndex, commentIndex);
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
            })
            .catch((err)=>{
                alert(err);
                alert("Oops!! cannot delete comment:"+commentID);
                console.log('Error:something wrong happan during ajax GET request');
            });
            
        });
    }
    
    init(){
        this.postsRepository.utilAjax("/posts","GET")
        .then((data)=>{
            console.log(data);
            this.postsRepository.posts = data;
            this.postsRenderer.renderPosts(this.postsRepository.posts);
        })
        .catch((err)=>{
            alert("Oops!!");
            console.log('Error:something wrong happan during ajax GET request');
        })
    }
}

export default EventsHandler