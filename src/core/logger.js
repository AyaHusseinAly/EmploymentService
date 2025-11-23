const models = require('../models'); // modeuls/index.js

const Logger = {
    async log(level, message, context = {}) {
        try {
            await models.log.create({
                Level: level,
                Message: message,
                Context: context
            });
        } catch (err) {
            console.error('Failed to save log:', err.message);
        }
    }
};

module.exports = Logger;