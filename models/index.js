const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

User.hasMany(Post, {
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false
    }
})

Post.belongsTo(User)

Comment.belongsTo(User)

User.hasMany(Comment)

Comment.belongsTo(Post)

Post.hasMany(Comment)

module.exports = {
    User,
    Post,
    Comment
}