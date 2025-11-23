const { validationResult } = require('express-validator');
const DataAccess = require('../core/dataAccess');
const ProcessStatus = require('../core/processStatus');
const EmpInfo = require('../core/empInfo');
const Logger = require('../core/logger');

exports.getEmpStatus = async(req, res, next) => {
    try {
        Logger.log('INFO', 'API getEmpStatus called', { path: req.path, body: req.body });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Logger.log('WARN', 'Validation failed', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        const { nationalNumber } = req.body;

        const user = await DataAccess.getUserWithSalaries(nationalNumber);

        if (!user) {
            Logger.log('WARN', 'Invalid National Number', { nationalNumber });
            return res.status(404).json({ message: 'Invalid National Number' });
        }

        if (!user.isActive) {
            Logger.log('WARN', 'Inactive user attempted access', { nationalNumber });
            return res.status(406).json({ message: 'User is not Active' });
        }

        if (user.salaries.length < 3) {
            Logger.log('WARN', 'Insufficient salary data', { nationalNumber, salaryRecords: user.salaries.length });
            return res.status(422).json({ message: 'INSUFFICIENT_DATA' });
        }

        const salaryData = ProcessStatus.calculate(user.salaries);
        const empInfo = new EmpInfo(user, salaryData);

        Logger.log('INFO', 'Returned employee info successfully!', { nationalNumber });

        res.status(200).json(empInfo.toJSON());

    } catch (err) {
        // pass to errorHandler
        next(err)
    }
};