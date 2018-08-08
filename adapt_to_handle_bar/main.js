var SpacebookApp = function() {
    var postsData = {
        posts: [] //{
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
            //     id: 1,
            //     comments: [
            //         { text: "Man, this is a comment!" },
            //         { text: "Man, this is a comment!" },
            //         { text: "Man, this is a comment!" }
            //     ]
            // },
            // {
            //     text: "Hello world",
            //     id: 2,
            //     comments: [
            //         { text: "Man, this is a comment!" },
            //         { text: "Man, this is a comment!" },
            //         { text: "Man, this is a comment!" }
            //     ]
            //  }]
    };

    // the current id to assign to a post
    var currentId = 0;
    var currentComment = 0;
    //step 3: turn our "template" into html
    var source = $('#store-template').html();
    // step 4 : compile our template html using handlebars
    var template = Handlebars.compile(source);


    var _findPostById = function(id) {
        for (var i = 0; i < postsData.posts.length; i += 1) {
            if (postsData.posts[i].id == id) {
                return postsData.posts[i];
            }
        }
    }

    var _findCommentById = function(post, cid) {
        for (var i = 0; i < post.comments.length; i += 1) {
            if (post.comments[i].id == cid) {
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
        postsData.posts.push(post);
    }

    var renderPosts = function() {
        $('.posts').empty();
        // step 5: fill our template with information
        var newHTML = template(this.postsData);
        // step 6: append our new html to the page
        $('.posts').append(newHTML);
    }

    var getCommentsHTML = function(post) {
        var commentsHTML = '';

        for (c of post.comments) {
            var commentHTML = _createCommentHTML(c.text, c.id);
            commentsHTML = commentsHTML + commentHTML;
        }
        commentsHTML = '<ul>' + commentsHTML + '</ul>';
        return commentsHTML;
    }

    var _createCommentHTML = function(text, id) {
        return ('<li class="comment" comment-id=' + id + '>' +
            text + ' <a href="#" class="remove-comment">remove</a> ' + '</li>');
    }

    var removePost = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        var id = $clickedPost.data().id;
        var post = _findPostById(id);
        postsData.posts.splice(postsData.posts.indexOf(post), 1);
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
        postsData: postsData,
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,
        toggleComments: toggleComments,
        createComment: createComment,
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
    var text = $(this).closest('.post').children(".comments-container").children('input').val();
    var pid = $(this).closest('.post').attr("data-id");
    app.createComment(text, pid);
    app.renderPosts();
});

$('.posts').on('click', '.remove-comment', function() {
    var cid = $(this).closest("li").attr("comment-id");
    var comment = $(this).closest("li").text();
    var pid = $(this).closest(".post").attr("data-id");
    app.removeComment(comment, pid, cid);
    app.renderPosts();
});