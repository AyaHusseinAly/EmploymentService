const models = require('../models'); // modeuls/index.js
const Logger = require('./logger');
const withRetry = require('../utils/retryMechanism');
const { setCache, getCache } = require('./cache');
class DataAccess {
    constructor() {
        this.userModel = models.user;
        this.salaryModel = models.salary;
    }

    async getUserWithSalaries(nationalNumber) {
        const cached = getCache(nationalNumber);
        if (cached) {
            await Logger.log('INFO', 'cached user ', { nationalNumber });
            return cached;
        }

        return withRetry(async() => {
            const user = await this.userModel.findOne({
                where: { nationalNumber },
                include: [{ model: this.salaryModel, as: 'salaries' }] // join
            });

            await Logger.log('INFO', 'Fetched user with salaries', { nationalNumber });
            setCache(nationalNumber, user);
            return user;
        });
    }


}

module.exports = new DataAccess();