const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const validateToken = require('../../middleware/auth');
const { getCurrentUser } = require('../../controllers/auth');
const { register } = require('../../controllers/users');

router.get('/me', validateToken, getCurrentUser);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  register,
);

module.exports = router;