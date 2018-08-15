describe("app.createPost", function() {
    it("should add a new post to the list", function() {
        app.createPost("jjj");

        var actualResult = app.posts[app.posts.length - 1].text;

        expect(actualResult).toBe("jjj");
    });
    it("should add a new post to the list empty text", function() {
        app.createPost("");

        var actualResult = app.posts[app.posts.length - 1].text;

        expect(actualResult).toBe("");
    });
    it("should add a new post to the list only numbers", function() {
        app.createPost('1234567');

        var actualResult = app.posts[app.posts.length - 1].text;

        expect(actualResult).toBe('1234567');
    });
    it("should add a new post to the list special chars", function() {
        app.createPost("@#$$%%^&**()(*&*^$#$");

        var actualResult = app.posts[app.posts.length - 1].text;

        expect(actualResult).toBe("@#$$%%^&**()(*&*^$#$");
    });
    it("should add a new post to the list start with _", function() {
        app.createPost("_fff");

        var actualResult = app.posts[app.posts.length - 1].text;

        expect(actualResult).toBe("_fff");
    });
    it("should add a new post to the list start with -", function() {
        app.createPost("-fff");

        var actualResult = app.posts[app.posts.length - 1].text;

        expect(actualResult).toBe("-fff");
    });

    it("should add a new post to the list text is undefined", function() {
        app.createPost(undefined);

        var actualResult = app.posts[app.posts.length - 1].text;

        expect(actualResult).toBe(undefined);
    });

    it("should add a new post to the list start with space", function() {
        app.createPost(null);

        var actualResult = app.posts[app.posts.length - 1].text;

        expect(actualResult).toBe(null);
    });

});

describe("app.removePost", function() {
    it("should remove a specific post from the list by given ID", function() {
        var postTopush = {
            text: "Hello world",
            id: 99,
            comments: []
        }
        app.posts.push(postTopush);
        var lengthBefore = app.posts.length;
        var postBefore = app._findPostById(99); //not undefined 
        expect(postBefore.id).toBe(99);
        expect(postBefore.text).toBe("Hello world");
        app.removePost(99);
        var postAfter = app._findPostById(99); //udefined
        expect(postAfter).toBe(undefined);
        expect(app.posts.length).toBe(lengthBefore - 1); //decrement length
    });
    it("should remove a specific post from the list by not exist given ID", function() {
        var lengthBefore = app.posts.length;
        var postBefore = app._findPostById(100);
        expect(app._findPostById(100)).toBe(undefined);
        app.removePost(100);
        expect(app.posts.length).toBe(lengthBefore);
    });
});
describe("app._findPostById", function() {
    it("should return post by given ID", function() {
        var postTopush = {
            text: "Hello world",
            id: 104,
            comments: []
        }
        app.posts.push(postTopush);
        app._findPostById(104);
        expect(app._findPostById(104).id).toBe(104);
    });
    it("should return undefined by not exist given ID", function() {
        app._findPostById(100);
        expect(app._findPostById(100)).toBe(undefined);
    });
});

describe("app._findPostById", function() {
    it("should return post by given ID", function() {
        var postTopush = {
            text: "Hello world",
            id: 109,
            comments: []
        }
        app.posts.push(postTopush);
        app._findPostById(109);
        expect(app._findPostById(109).id).toBe(109);
    });
    it("should return undefined by not exist given ID", function() {
        app._findPostById(100);
        expect(app._findPostById(100)).toBe(undefined);
    });
});

describe("app.createComment", function() {
    it("should add comment to specific post by given postID and text comment ", function() {
        var postTopush = {
            text: "Hello world",
            id: 110,
            comments: []
        }
        let text_comment = "i'm a cool comment";
        app.posts.push(postTopush);
        expect(app._findPostById(110).id).toBe(110);
        app.createComment(text_comment, 110);
        let post = app._findPostById(110);
        expect(post.comments[post.comments.length - 1].text).toBe(text_comment);
    });
});