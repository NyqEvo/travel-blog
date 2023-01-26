const router = require('express').Router();
const postRoutes = require('./Post');
const userRoutes = require('./User');
const commentRoutes = require('./Comment');
const tagRoutes = require('./Tag');
const cloudinary = require('./Cloudinary');
const noteRoutes = require('./Note');

router.use('/post', postRoutes);
router.use('/user', userRoutes);
router.use('/comment', commentRoutes);
router.use('/tag', tagRoutes);
router.use('/add-cloudinary', cloudinary);
router.use('/note', noteRoutes)

module.exports = router;