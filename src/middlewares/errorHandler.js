const Logger = require('../core/logger');

// Global error handler middleware
function errorHandler(err, req, res, next) {
    Logger.log('ERROR', err.message, {
        path: req.path,
        method: req.method,
        body: req.body,
        stack: err.stack
    });

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: message
    });
}

module.exports = errorHandler;