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
}

function addComment() {
    const postCard = document.getElementsByClassName('create-comment-main-section')
    const button = document.getElementsByClassName('new-post-button')
    postCard[0].style.display = 'none'
    button[0].style.display = 'none'
    const createPostContainer = document.getElementsByClassName('create-post-container')
    console.log(createPostContainer)
    //createPostContainer[0].style.display = 'flex'
}

setPage()