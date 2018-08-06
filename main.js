//INDIVIDUAL PROJECT EXERCISE 1
const posts = [];
let pNumerator = 0;

$('button').on('click', function() {
    let relevantInput = $(this).closest("div").find("input").val();
    addPost(pNumerator, relevantInput);
    render();
    pNumerator++;
})

function addPost(id, text) {
    posts.push({ id: id, text: text });
}

//INDIVIDUAL PROJECT EXERCISE 2
function render() {
    $('.post').remove();
    for (let post of posts) {
        let a = `<p class="post" data-id="${post.id}"> <button type="button" class="remove">REMOVE</button> ${post.text}</p>`;
        $(".posts").append(a);
    }
    //add click event to button 
    $('.post').on('click', '.remove', function() {
        let pid = $(this).closest('p').attr("data-id");
        bindEvent(pid);
    });

}

//INDIVIDUAL PROJECT EXERCISE 3
function removePost(id) {
    let toRemove = findPostByID(id);
    posts.splice(toRemove, 1);
}

function findPostByID(id) {
    for (let i in posts) {
        if (parseInt(id) === parseInt(posts[i].id)) {
            return i;
        }
    }
}

var bindEvent = function(id) {
    removePost(id);
    render();
}