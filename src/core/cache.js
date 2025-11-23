// const NodeCache = require('node-cache');
// const cache = new NodeCache({ stdTTL: 60 }); // 60 sec
const cache = new Map();

function setCache(key, value, ttl = 60000) {
    const expires = Date.now() + ttl;
    cache.set(key, { value, expires });
}

function getCache(key) {
    const entry = cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expires) {
        cache.delete(key);
        return null;
    }

    return entry.value;
}


module.exports = { getCache, setCache };