// Initialize an empty array to store posts
let postsArray = [];

// Get references to DOM elements
const titleInput = document.getElementById('post-title');
const bodyInput = document.getElementById('post-body');
const form = document.getElementById('new-post');

// Function to render posts on the webpage
function renderPosts() {
    let html = "";
    // Iterate through each post in the array and generate HTML
    for(let post of postsArray) {
        html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
        `;
    }
    // Set the HTML content of the blog-list element
    document.getElementById('blog-list').innerHTML = html;
}

// Fetch posts from an API endpoint
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        // Store only the first 5 posts from the response
        postsArray = data.slice(0, 5);
        // Render the posts on the webpage
        renderPosts();
    });

// Add event listener to the form for submitting new posts
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission behavior
    // Retrieve values from input fields
    const postTitle = titleInput.value;
    const postBody = bodyInput.value;
    // Create an object with post data
    const data = {
        title: postTitle,
        body: postBody
    };
    // Configure fetch options for posting data
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
    // Send POST request to API endpoint
    fetch("https://jsonplaceholder.typicode.com/posts", options)
        .then(response => response.json())
        .then(post => {
            // Add the newly created post to the beginning of the array
            postsArray.unshift(post);
            // Render the updated posts on the webpage
            renderPosts();
            // Clear input fields after successful submission
            titleInput.value = '';
            bodyInput.value = '';
        });
});