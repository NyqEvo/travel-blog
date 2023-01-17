const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../../models');

router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Tag,
                },
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

router.get('/:id', async (req, res) => {

    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Tag,
                },
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

module.exports = router;