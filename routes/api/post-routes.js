const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models')

router.get("/", async (req, res) => {
    try {
        const data = await Post.findAll({
            include: [User]
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ msg: "ERROR", err })
    }
})

// router.get("/:id", async (req, res) => {
//     try {
//         const data = await Post.findByPk({
//             include: [User, Comment]
//         })
//     } catch (err) {
//         res.status(500).json({ msg: "ERROR", err })
//     }
// })

router.post("/", (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        UserId: req.session.user.id,
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "ERROR", err })
    })
})

module.exports = router