const { validationResult } = require('express-validator');
const DataAccess = require('../core/dataAccess');
const ProcessStatus = require('../core/processStatus');
const EmpInfo = require('../core/empInfo');

exports.getEmpStatus = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nationalNumber } = req.body;
        const user = await DataAccess.getUserWithSalaries(nationalNumber);

        if (!user) {
            return res.status(404).json({ message: 'Invalid National Number' });
        }

        if (!user.isActive) {
            return res.status(406).json({ message: 'User is not Active' });
        }

        if (user.salaries.length < 3) {
            return res.status(422).json({ message: 'INSUFFICIENT_DATA' });
        }

        const salaryData = ProcessStatus.calculate(user.salaries);
        const empInfo = new EmpInfo(user, salaryData);

        res.status(200).json(empInfo.toJSON());

    } catch (err) {
        // pass to errorHandler
        next(err)
    }
};