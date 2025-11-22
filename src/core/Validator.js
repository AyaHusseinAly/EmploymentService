const { body } = require('express-validator');

exports.getEmpStatus = [
    body('nationalNumber')
    .trim()
    .escape() // sanitize XSS or HTML
    .notEmpty().withMessage('nationalNumber is required')
];