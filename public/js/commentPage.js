async function setPage() {
    const data = await JSON.parse(localStorage.getItem('postData'))

    const title = document.getElementById('title')
    const userInfo = document.getElementById('user-info')
    const getDate = new Date(data.createdAt)
    const date = `${getDate.getMonth() + 1}/${getDate.getDate()}/${getDate.getFullYear()}`
    const content = document.getElementById('content')

    title.innerHTML = data.title
    userInfo.innerHTML = `Posted by ${data.User.username} on ${date}`
    content.innerHTML = data.content

    const commentContainer = document.getElementById('comment-container')
    for (let i = 0; i < data.Comments.length; i++) {
        const response = await fetch('http://localhost:3001/api/users')
        const userData = await response.json()
        let username = null
        for (let d = 0; d < userData.length; d++) {
            if (userData[d].id == data.Comments[0].UserId) {
                username = userData[d].username
            }
        }
        const getDate = new Date(data.Comments[i].createdAt)
        const date = `${getDate.getMonth() + 1}/${getDate.getDate()}/${getDate.getFullYear()}`
        const commentCard = document.createElement("span")
        commentCard.innerHTML = `${data.Comments[i].content}\n-${username}, ${date}`
        commentContainer.appendChild(commentCard)
        console.log(data)
    }
}

function addComment() {
    const button = document.getElementsByClassName('new-post-button')
    button[0].style.display = 'none'
    const createCommentContainer = document.getElementById('create-comment-container')
    createCommentContainer.style.display = 'flex'
}

async function makeComment() {
    const postId = await JSON.parse(localStorage.getItem('postData'))
    const commentObj = {
        content: document.querySelector('#comment-content').value,
        PostId: postId.id
    }
    const data = fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(commentObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (data.ok) {
        location.reload()
    } else {
        alert("ERROR")
    }
}

setPage()