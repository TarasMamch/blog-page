async function login() {
    const userObj = {
        username: document.querySelector("#login-username").value,
        password: document.querySelector("#login-password").value,
    }
    const data = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (data.ok) {
        localStorage.clear()
        const a = []
        const user = JSON.stringify(userObj.username);
        a.push(user)
        localStorage.setItem('user', a)
        location.href = "/dashboard"
    } else {
        alert("invalid login credentials")
    }
}

async function signUp() {
    const userObj = {
        username: document.querySelector("#login-username").value,
        email: document.querySelector("#login-email").value,
        password: document.querySelector("#login-password").value
    }
    const data = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (data.ok) {
        location.href = "/login";
    } else {
        alert("failed to register");
    }
}