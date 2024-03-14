fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        const postsArr = data.slice(0, 5);
        let html = "";

        for(let post of postsArr) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `
        }
        document.getElementById('blog-list').innerHTML = html
        // console.log(html)
    })

    document.getElementById('new-post').addEventListener('submit', function(e) {
        e.preventDefault()
        const postTitle = document.getElementById('post-title').value
        const postBody = document.getElementById('post-body').value
        const data = {
            title: postTitle,
            body: postBody
        }
        // console.log(data)
    })