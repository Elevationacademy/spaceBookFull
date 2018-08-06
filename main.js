var SpacebookApp = function() {
    var posts = [
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]},
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]},
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]}
    ];

    // the current id to assign to a post
    var currentId = 0;
    var currentComment = 0;
    var $posts = $('.posts');
    var $comment = $('.comment');

    var _findPostById = function(id) {
        for (var i = 0; i < posts.length; i += 1) {
            if (parseInt(posts[i].id) === parseInt(id)) {
                return posts[i];
            }
        }
    }


    var _findCommentById = function(post, cid) {
        for (var i = 0; i < post.comments.length; i += 1) {
            if (parseInt(post.comments[i].id) === parseInt(cid)) {
                return post.comments[i];
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
                '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
                '<ul class="comments"></ul>' +
                commentsContainer + '</div>');
        }
    }

    var removePost = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        var id = $clickedPost.data().id;
        var post = _findPostById(id);
        posts.splice(posts.indexOf(post), 1);
    }

    var createComment = function(text, pid) {
        var post = _findPostById(pid);
        var comment = {
            text: text,
            id: currentComment
        }
        post.comments.push(comment);
        currentComment++;
    }

    var renderComments = function(pid) {
        $('.comments').children("li").remove();
        var post = _findPostById(pid);
        for (c of post.comments) {
            comment = '<li class="comment" comment-id=' + c.id + '>' + c.text + ' <a href="#" class="remove-comment">remove</a> ' + '</li>';
            $('.post').children('ul').append(comment);
        }
    }

    var removeComment = function(comment1, pid, cid) {
        var post = _findPostById(pid);
        var comment = _findCommentById(post, cid);
        post.comments.splice(post.comments.indexOf(comment), 1);
    }

    var toggleComments = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        $clickedPost.find('.comments-container').toggleClass('show');
    }

    return {
        posts: posts,
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,
        toggleComments: toggleComments,
        createComment: createComment,
        renderComments: renderComments,
        removeComment: removeComment,

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
    var pid = $(this).closest('.post').attr("data-id");
    app.createComment(text, pid);
    app.renderComments(pid);
});

$('.posts').on('click', '.remove-comment', function() {
    var cid = $(this).closest("li").attr("comment-id");
    var comment = $(this).closest("li").text();
    var pid = $(this).closest(".post").attr("data-id");
    app.removeComment(comment, pid, cid);
    app.renderComments(pid);
});