
const redis = require('../../services/redis-cli');
const keys = require('../../config/keys.json');

module.exports.getRandomWord = () =>
    new Promise((resolve, reject) => {
        const randomKey = keys.val[Math.floor((Math.random() * keys.val.length) + 0)];

        console.log('=====================> getting key', randomKey);
        redis.get(randomKey)
            .then((response) => {
                console.log('=====================> RESPONSE from redis', response);
                if (response && response !== null) {
                    resolve(response);
                } else {
                    const error = new Error(`Could not find the word for key ${randomKey}`);
                    console.log('=====================> REJECTING', error);
                    reject(error);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
