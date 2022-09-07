const express = require('express');
const router = express.Router();
const { Comment, User, Post } = require('../../models')

router.get("/", async (req, res) => {
    try {
        const data = await Comment.findAll({
            include: [User, Post]
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ msg: "ERROR", err })
    }
})

router.post("/", (req, res) => {
    Comment.create({
        content: req.body.content,
        UserId: req.session.user.id,
        PostId: req.body.PostId
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "ERROR", err })
    })
})

module.exports = router