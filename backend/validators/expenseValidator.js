const { body } = require('express-validator');

exports.expenseValidator = [
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
  body('currency').isLength({ min: 3, max: 3 }).withMessage('Currency code required'),
  body('date').isISO8601().withMessage('Valid date required'),
  body('category').notEmpty().withMessage('Category required')
];