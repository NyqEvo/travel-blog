const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../../models');

//3001/api/comment
router.get('/', async (req, res) => {

    try {
        const commentData = await Comment.findAll() 

        const comments = commentData.get({ plain: true });
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err)
    }
});

//3001/api/comment/#
router.get('/:id', async (req, res) => {

    try {
        const commentData = await Comment.findByPk(req.params.id)

        const comments = commentData.get({ plain: true });
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err)
    }
});

//3001/api/comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });
    res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;