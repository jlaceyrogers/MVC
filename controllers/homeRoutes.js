const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        res.render('homepage', { allPosts });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, { include: [Comment] });
        res.render('post', { post });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ... Additional routes for homepage functionalities

module.exports = router;
