const { validationResult } = require('express-validator');
const DataAccess = require('../core/DataAccess');
exports.getEmpStatus = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nationalNumber } = req.body;
        const user = await DataAccess.getUserWithSalaries(nationalNumber);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        // pass errorHandler
        next(err)
    }
};