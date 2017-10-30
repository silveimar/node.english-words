
const redis = require('../../services/redis-cli');
const keys = require('../../config/keys.json');

module.exports.getRandomWord = () =>
    new Promise((resolve, reject) => {
        const randomKey = keys.val[Math.floor((Math.random() * keys.val.length) + 0)];

        console.log('=====================> getting key', randomKey);
        redis.get(randomKey)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
