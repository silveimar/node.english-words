
const client = require('../init/redis').getRedisClient();

module.exports.get = key => client.getAsync(key);
