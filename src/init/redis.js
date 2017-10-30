const bluebird = require('bluebird');
const redis = require('redis');
const config = require('../config/config');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client;

function initRedis() {
    const options = {
        host: config.redis.host,
        port: config.redis.port,
    };
    client = redis.createClient(options);
}

initRedis();

module.exports.getRedisClient = () => {
    if (client === undefined) {
        initRedis();
    }
    return client;
};
