const Logger = require('../core/logger');

const apiToken = process.env.API_TOKEN || 'supersecret123'
module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token || token !== apiToken) {
        Logger.log('WARN', 'Invalid API token', { path: req.path, method: req.method, token });
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};