const express = require('express');
const router = express.Router();
const empController = require('../controllers/employee.controller');
const validator = require('../core/Validator');

// POST /api/GetEmpStatus
router.post(
    '/GetEmpStatus',
    validator.getEmpStatus,
    empController.getEmpStatus
);

module.exports = router;