const { body } = require('express-validator');

exports.createUserValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('role').isIn(['Admin','Manager','Employee']).withMessage('Role must be valid')
];

exports.updateRoleValidator = [
  body('role').isIn(['Admin','Manager','Employee']).withMessage('Role must be valid')
];