const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../../models');

router.put('/', async (req, res) => {
    console.log(req.body)
    try {
       
        const updatedPost = await Post.update({
            // TODO CORRECT THE URL HERE
            img: `http://www.cloudinary.com/public/${req.body.public_id}`
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