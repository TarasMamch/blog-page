const writePostContainer = document.getElementById('create-post-container')
const mainPageContainer = document.getElementById('dashboard-main-container')
const footer = document.getElementsByClassName('new-post-button')

async function setPage() {
    writePostContainer.style.display = 'flex'
    mainPageContainer.style.display = 'none'
    footer[0].style.display = 'none'
}

function createPost() {
    const blogObj = {
        title: document.querySelector("#title").value,
        content: document.querySelector("#content").value
    }
    const data = fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(blogObj),
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

async function generatePosts() {
    const response = await fetch('http://localhost:3001/api/users')
    const data = await response.json()
    const user = await JSON.parse(localStorage.getItem('user'))

    for (let i = 0; i < data.length; i++) {
        if (data[i].username == user) {
            data[i].Posts.forEach(post => {
                const divEl = document.createElement('div')
                const title = document.createElement('span')
                const dateEl = document.createElement('span')
                const getDate = new Date(post.createdAt)
                const date = `${getDate.getMonth() + 1}/${getDate.getDate()}/${getDate.getFullYear()}`

                title.innerHTML = post.title
                dateEl.innerHTML = date
                divEl.appendChild(title)
                divEl.appendChild(dateEl)
                divEl.setAttribute('class', 'post-title-card')
                divEl.onclick = () => editPost(title.innerHTML)
                mainPageContainer.appendChild(divEl)
            })
        }
    }
}

function editPost(title) {

}



generatePosts()