const express = require("express")
const exphbs = require("express-handlebars")
const allRoutes = require("./controllers")
const sequelize = require("./config/connection")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))

app.use(express.static("public"))

const hbs = exphbs.create({})
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use("/", allRoutes)

sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT" + PORT)
    })
})