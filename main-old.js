var SpacebookApp = function() {
    var posts = [{
        //     text: "Hello world",
        //     id: 0,
        //     comments: [
        //         { text: "Man, this is a comment!" },
        //         { text: "Man, this is a comment!" },
        //         { text: "Man, this is a comment!" }
        //     ]
        // },
        // {
        //     text: "Hello world",
        //     id: 0,
        //     comments: [
        //         { text: "Man, this is a comment!" },
        //         { text: "Man, this is a comment!" },
        //         { text: "Man, this is a comment!" }
        //     ]
        // },
        // {
        //     text: "Hello world",
        //     id: 0,
        //     comments: [
        //         { text: "Man, this is a comment!" },
        //         { text: "Man, this is a comment!" },
        //         { text: "Man, this is a comment!" }
        //     ]
    }];

    // the current id to assign to a post
    var currentId = 0;
    var $posts = $('.posts');

    var _findPostById = function(id) {
        for (var i = 0; i < posts.length; i += 1) {
            if (posts[i].id === id) {
                console.log("find:" + posts[i]);
                return posts[i];
            }
        }
    }

    var createPost = function(text) {
        var post = {
            text: text,
            id: currentId,
            comments: []
        }

        currentId += 1;

        posts.push(post);
    }

    var renderPosts = function() {
        $posts.empty();

        for (var i = 0; i < posts.length; i += 1) {
            var post = posts[i];
            var commentsContainer = '<div class="comments-container">' +
                '<input type="text" class="comment-name">' +
                '<button class="btn btn-primary add-comment">Post Comment</button> </div>';
            $posts.append('<div class="post" data-id=' + post.id + '>' +
                '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text + '<ul class="comment">' + '</ul>' +
                commentsContainer + '</div>');
        }
    }

    var removePost = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        var id = $clickedPost.data().id;
        var post = _findPostById(id);
        posts.splice(posts.indexOf(post), 1);
    }

    var toggleComments = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        $clickedPost.find('.comments-container').toggleClass('show');
    }

    var createComment = function(currentPost, text) {
        var comment = {
            text: text
        }
        var $clickedPost = $(currentPost).closest('.post');
        var id = $clickedPost.data().id;
        var post = _findPostById(id);
        console.log(post);
        //console.log(comment.text);
        //posts.indexOf(post).push(comment);
        //alert('add comment');
    }

    var renderComments = function(currentPost) {
        //$(currentPost).find("ul").empty();
        let $ul = $(currentPost).closest(".post").find("ul");
        ($ul).empty();
        ($ul).append('<il>' + 'comment' + '</il>');
        let pid = $(currentPost).closest(".post").attr("data-id");
        console.log("pid=" + pid);
        //let post = _findPostById(pid);
        //alert(post);
        //console.log(posts);
        //$posts.empty();  
        // let str = '';
        // let i = _findPostById(pid);
        // console.log(posts[i]);
        // let comments = posts[i].comments;
        // if (comments.length === 0)
        //     return '';
        // for (var c = 0; c < comments.length; c += 1) {
        //     var comment = commnts[i];
        //     str = ('<il>' + comment + '</il>')
        //     console.log(str);
        // }
        // return str;
    }



    var removeComment = function() {
        // TODO: Implement
    }

    return {
        _findPostById: _findPostById,
        posts: posts,
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,
        createComment: createComment,
        renderComments: renderComments,
        removeComment: removeComment,
        toggleComments: toggleComments
    }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function() {
    var text = $('#post-name').val();

    app.createPost(text);
    app.renderPosts();
});

$('.posts').on('click', '.remove', function() {
    app.removePost(this);
    app.renderPosts();
});

$('.posts').on('click', '.show-comments', function() {
    app.toggleComments(this);
});


$('.posts').on('click', '.add-comment', function() {
    var text = $(".comment-name").val();
    app.createComment(this, text);
    app.renderComments(this);
});