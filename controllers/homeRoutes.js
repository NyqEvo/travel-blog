const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../models');
const withAuth = require('../utils/auth');

//const Calendar = require("calendar");
//Calendar = require("calendar").Calendar;

//render homepage
router.get('/', async (req, res) => {
    try {
        res.render('landing')
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
            ]
        });
        res.send('REPLACE ME LATER')
    } catch (err) {
        res.status(500).json(err);
    }
});

// If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

// router.get("/calendar/:year/:month", async (req, res) => {
//   try {
//     cal = new Calendar();
//     if (req.params.year && req.params.month) {
//         days = cal.monthDays(parseInt(req.params.year), parseInt(req.params.month));

//         console.log(days);
//     }

//     res.send("<pre>" + days + "</pre>");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;