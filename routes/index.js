const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated,(req, res) => res.render('front-pages/index'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('User-dashboard/dashboard', {
    user: req.user
  })
);

module.exports = router;