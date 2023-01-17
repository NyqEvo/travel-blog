const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../../models');

router.get('/', async (req, res) => {

    try {
        const commentData = await Comment.findAll()

        const comments = commentData.get({ plain: true });
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {

    try {
        const commentData = await Comment.findByPk(req.params.id)

        const comments = commentData.get({ plain: true });
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;