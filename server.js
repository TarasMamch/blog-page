const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const sequelize = require('./config/connection')
const session = require('express-session')
const path = require('path')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    },
    resave: false,
    saveUninitialized: true,
    Store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))

app.use(express.static(path.join(__dirname, '/public')))

const hbs = exphbs.create({
    helpers: {
        trimString(passedString, startstring, endstring) {
            let theString = String(passedString).substring(startstring, endstring)
            return theString
        }
    }
})
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(routes)

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT)
})