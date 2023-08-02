const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const bcrypt = require('bcryptjs');

// User API routes
router.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ username: req.body.username, password: hashedPassword });
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Post API routes
router.post('/posts', async (req, res) => {
    try {
        const post = await Post.create({ title: req.body.title, content: req.body.content, userId: req.session.user.id });
        res.json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Comment API routes
router.post('/comments', async (req, res) => {
    try {
        const comment = await Comment.create({ content: req.body.content, postId: req.body.postId, userId: req.session.user.id });
        res.json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// ... Additional CRUD API routes

module.exports = router;
