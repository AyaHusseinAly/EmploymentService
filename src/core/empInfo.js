class EmpInfo {
    constructor(user, salaryData) {
        this.employeeName = user.username;
        this.nationalNumber = user.nationalNumber;
        this.isActive = user.isActive;
        this.highestSalary = salaryData.highestSalary;
        this.averageSalary = salaryData.averageSalary;
        this.status = salaryData.status;
        this.lastUpdated = salaryData.lastUpdated;
    }

    toJSON() {
        const orderedFields = [
            'employeeName',
            'nationalNumber',
            'highestSalary',
            'averageSalary',
            'status',
            'isActive',
            'lastUpdated'
        ];

        const output = {};
        for (const field of orderedFields) {
            const key = field.charAt(0).toUpperCase() + field.slice(1);
            output[key] = this[field];
        }
        return output;
    }
}

module.exports = EmpInfo;