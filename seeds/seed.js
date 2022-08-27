const sequelize = require("../config/connection");

const { User, Post } = require("../models");

const users = [
    {
        username: "joeLovesCats",
        email: "joe@joe.joe",
        password: "password"
    },
    {
        username: "BaShiva",
        email: "joescats@joe.joe",
        password: "weAreTheBest"
    }
]

const posts = [
    {
        UserId: 1,
        title: 'test1',
        content: "whoa its like twitter ",
    },
    {
        UserId: 1,
        title: 'test2',
        content: "i love cats so much",
    },
    {
        UserId: 2,
        title: 'test3',
        content: "being a cat is great!",
    },
]

const seedMe = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users, { individualHooks: true })
    await Post.bulkCreate(posts)
    process.exit(0)
}

seedMe()