const models = require('../models'); // modeuls/index.js
const Logger = require('./logger');
const withRetry = require('../utils/retryMechanism');
class DataAccess {
    constructor() {
        this.userModel = models.user;
        this.salaryModel = models.salary;
    }

    getUserWithSalaries(nationalNumber) {
        return withRetry(async() => {
            const user = await this.userModel.findOne({
                where: { nationalNumber },
                include: [{ model: this.salaryModel, as: 'salaries' }] // join
            });

            await Logger.log('INFO', 'Fetched user with salaries', { nationalNumber });
            return user;
        });
    }


}

module.exports = new DataAccess();