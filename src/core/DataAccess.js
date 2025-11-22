const models = require('../models'); // modeuls/index.js

class DataAccess {
    constructor() {
        this.userModel = models.user;
        this.salaryModel = models.salary;
    }

    async getUserWithSalaries(nationalNumber) {
        try {
            const user = await this.userModel.findOne({
                where: { nationalNumber },
                include: [{ model: this.salaryModel, as: 'salaries' }] // join
            });
            return user;
        } catch (err) {
            throw new Error(`DB Error while fetching user: ${err.message}`);
        }
    }
}

module.exports = new DataAccess();