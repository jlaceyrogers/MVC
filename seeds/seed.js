const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { User, Post, Comment } = require('../models');

const userData = [
    {
        username: 'johnDoe',
        password: bcrypt.hashSync('password123', 10)
    },
    {
        username: 'janeSmith',
        password: bcrypt.hashSync('password456', 10)
    },
];

const postData = [
    {
        title: 'Why MVC is so important',
        content: 'MVC allows developers to maintain a true separation of concerns...',
        user_id: 1
    },
    {
        title: 'Authentication vs Authorization',
        content: 'Authentication is the process of verifying who a user is...',
        user_id: 2
    },
    // ... any other post data you'd like to seed
];

const commentData = [
    {
        comment_text: 'Thanks for sharing this!',
        user_id: 2,
        post_id: 1
    },
    {
        comment_text: 'Great article. I have a question about...',
        user_id: 1,
        post_id: 2
    },
    // ... any other comment data you'd like to seed
];

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
