const models = require('../models'); // modeuls/index.js

class DataAccess {
    constructor() {
        this.userModel = models.user;
        this.salaryModel = models.salary;
        this.logModel = models.log;
    }

    async getUserWithSalaries(nationalNumber) {
        try {
            const user = await this.userModel.findOne({
                where: { nationalNumber },
                include: [{ model: this.salaryModel, as: 'salaries' }] // join
            });

            await this.saveLog('INFO', 'Fetched user with salaries', { nationalNumber });
            return user;
        } catch (err) {
            throw new Error(`Failed to fetch user: ${err.message}`);
        }
    }

    async saveLog(level, message, context = {}) {
        try {
            await this.logModel.create({
                Level: level,
                Message: message,
                Context: context
            });
        } catch (err) {
            console.error('Failed to save log:', err.message);
        }
    }
}

module.exports = new DataAccess();