const bcrypt = require('bcrypt');
const { User } = require('../models'); // Adjust the path to your models

const authMiddleware = {};

// Middleware to restrict route access to authenticated users
authMiddleware.restrict = (req, res, next) => {
  if (req.session.logged_in) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Middleware to handle user login
authMiddleware.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

      res.json({ user: user, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
};

// Middleware to handle user logout
authMiddleware.logout = (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
};

module.exports = authMiddleware;
