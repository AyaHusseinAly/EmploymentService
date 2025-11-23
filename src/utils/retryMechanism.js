const Logger = require('../core/logger');

async function withRetry(fn, retries = 3, delay = 200) {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await fn();
        } catch (err) {
            attempt++;
            Logger.log('WARN', 'Retry attempt failed', { attempt, error: err.message });

            if (attempt >= retries) {
                throw new Error(`Failed after ${retries} attempts: ${err.message}`);
            }

            // delay
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

module.exports = withRetry;