const DataAccess = require('./dataAccess');

const Logger = {
    async log(level, message, context = {}) {
        try {
            await DataAccess.saveLog(level, message, context);
        } catch (err) {
            console.error('Failed to write log to DB:', err.message);
        }
    }
};

module.exports = Logger;