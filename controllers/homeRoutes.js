const router = require('express').Router();
const { Post, User, Comment, Tag, PostTags } = require('../models');
const withAuth = require('../utils/auth');
const cloudinary = require("cloudinary").v2
const fse = require("fs-extra")

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET,
    secure: true
})

//render homepage
//3001/landing
router.get('/', async (req, res) => {
    try {
        res.render('landing', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
);

//3001/displayposts
router.get('/displayposts', async (req, res) => {
    try {
        req.session.logged_in = true;   // ugly hack
        const postdata = await Post.findAll({
            // include: [
            //     {
            //         model: User,
            //         attributes: ['name']
            //     },
            //     {
            //         model: Comment,
            //         attributes: ['info']
            //     }
            // ]
        })

        const posts = postdata.map((post) => post.get({ plain: true }));
        console.log('posts:', posts)
        res.render('displayposts', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//3001/createpost
router.get('/createpost', async (req, res) => {
    try {
        res.render('createpost')
    } catch (err) {
        res.status(500).json(err)
    }
});
//Render posts by given id
//3001/posts/#
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['info'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        });

        const post = postData.get({ plain: true })
        console.log('posts:', post)
        res.render('posts', {
            post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

//3001/createpost
router.post('/createpost', async (req, res) => {
    try {
        const newUser = await Post.create(req.body)
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// If the user is already logged in, redirect the request to another route
//3001/login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/displayposts');
        return;
    }

    res.render('login');
});


// router.get('/signup', (req, res) => {
//     // If the user is already logged in, redirect the request to another route
//     if (req.session.logged_in) {
//         res.redirect('/displayposts');
//         return;
//     }

//     res.render('signup');
// });

router.get("/get-signature", (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp
        },
        cloudinaryConfig.api_secret
    )
    res.json({ timestamp, signature })
});

router.post("/do-something-with-photo", async (req, res) => {
    const success = await fetch('/api/cloudinary/public-id')
    const expectedSignature = cloudinary.utils.api_sign_request({ public_id: req.body.public_id, version: req.body.version }, cloudinaryConfig.api_secret)

    if (expectedSignature === req.body.signature) {
        console.log('req.body =', req.body)
        console.log('req.session =', req.session)
        //   await fse.ensureFile("./data.txt")
        //   const existingData = await fse.readFile("./data.txt", "utf8")
        //   await fse.outputFile("./data.txt", existingData + req.body.public_id + "\n")
    }
});

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
      res.redirect('/');
    } else {
      res.status(404).end();
    }
  });

module.exports = router;