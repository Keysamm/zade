const { check } = require('express-validator')

// Post Validator
exports.validPost = [
  check('title')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Title must contain at more than 2 characters'),
  check('description')
    .notEmpty()
    .isLength({
      min: 4,
    })
    .withMessage('Description is required and must contain at more than 4'),
  check('author')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Author must contain at more than 2 characters'),
]
