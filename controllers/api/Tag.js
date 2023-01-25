const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../../models');

//3001/tag
router.get('/', async (req, res) => {

    try {
        const tagData = await Tag.findAll({
            include: [
                {
                    model: Post
                },
            ],
    });

        const tags = tagData.get({ plain: true });
        res.status(200).json(tags)
    } catch (err) {
        res.status(500).json(err)
    }
});

//3001/tag/#
router.get('/:id', async (req, res) => {

    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [
                {
                    model: Post
                },
            ],
        });

        const tags = tagData.get({ plain: true });
        res.status(200).json(tags)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;