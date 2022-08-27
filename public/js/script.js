const blogPosts = document.getElementById('main-blog-container')

async function generatePosts() {
    const response = await fetch("/api/posts")
    const data = await response.json()

    for (i = data.length - 1; i >= 0; i--) {
        const divEl = document.createElement('div')
        const postHeader = document.createElement('div')
        const userInfo = document.createElement('span')
        const title = document.createElement('h3')
        const content = document.createElement('span')
        postHeader.setAttribute('class', 'post-header')
        divEl.setAttribute('class', 'post')
        const getDate = new Date(data[i].createdAt)
        const date = `${getDate.getMonth() + 1}/${getDate.getDate()}/${getDate.getFullYear()}`
        divEl.setAttribute('value', data[i].title)

        userInfo.innerHTML = `Posted by ${data[i].User.username} on ${date}`
        title.innerHTML = data[i].title
        content.innerHTML = data[i].content

        divEl.onclick = () => getPostName(divEl.getAttribute('value'), data)

        if (window.location.href == 'http://localhost:3001/') blogPosts.appendChild(divEl)
        postHeader.appendChild(title)
        postHeader.appendChild(userInfo)
        divEl.appendChild(postHeader)
        divEl.appendChild(content)
    }
}

function getPostName(name, data) {
    let postObj = null
    for (let i = 0; i < data.length; i++) {
        if (name == data[i].title) {
            postObj = data[i]
        }
    }
    const a = []
    const d = JSON.stringify(postObj);
    a.push(d)
    localStorage.setItem('postData', a)
    location.href = "/post"
}

generatePosts()