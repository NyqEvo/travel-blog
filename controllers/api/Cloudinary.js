const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../../models');

router.put('/', async (req, res) => {
    console.log(req.body)
    try {

        const updatedPost = await Post.update({
            img: `https://res.cloudinary.com/du4klwka8/image/upload/v1674244470/${req.body.public_id}`
        }, {
            where: {
                id: req.body.post_id
            },
            returning: true
        });

        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;