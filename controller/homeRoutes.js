const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

//render homepage
router.get('/', async (req, res) => {
    try {
        res.render('homepage')
    } catch (err) {
        res.status(500).json(err);
    }
});

//Render posts by given id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    //data related to posts
                }
            ]});
    }catch (err){
        res.status(500).json(err);
    }
});

// If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/home');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;