const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../../models');

//3001/api/post
router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Comment,
                }
            ]
        })

        const posts = postData.get({ plain: true });
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
});

//3001/api/post/#
router.get('/:id', async (req, res) => {

    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                }
            ]
        })

        const posts = postData.get({ plain: true });
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
});

//3001/api/post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;