const router = require('express').Router()
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.get('/', (req, res) => {
    res.render("home", req.session.user)
})

router.get('/login', (req, res) => {
    res.render("login")
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

router.get('/signup', (req, res) => {
    res.render("signup")
})

router.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login")
    }
    res.render("club", req.session.user)
})

router.get("/post", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login")
    }
    res.render("post", req.session.user)
})

module.exports = router;