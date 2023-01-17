const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../../models');
// this is alreayd /api/user/
router.get('/', async (req, res) => {
    console.log('for insomnia testing')
    try {
        const userData = await User.findAll({
            include: [
                {
                    model: Post,
                }
            ]
        })

        const users = userData.get({ plain: true });
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {

    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
                }
            ]
        })

        const users = userData.get({ plain: true });
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;