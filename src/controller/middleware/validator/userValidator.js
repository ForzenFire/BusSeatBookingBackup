const { body, param, query } = require('express-validator');

const validateUser = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ];
  
  module.exports = {validateUser};