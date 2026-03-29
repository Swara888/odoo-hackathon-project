const { body } = require('express-validator');

exports.signupValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('company_name').notEmpty().withMessage('Company name required'),
  body('default_currency').isLength({ min: 3, max: 3 }).withMessage('Currency code required')
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
];