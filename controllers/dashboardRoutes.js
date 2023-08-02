const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { checkAuthentication } = require('../middleware/authMiddleware');

router.get('/', checkAuthentication, async (req, res) => {
    try {
        const userPosts = await Post.findAll({ where: { userId: req.session.user.id } });
        res.render('dashboard', { userPosts });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ... Additional routes for dashboard functionalities

module.exports = router;
