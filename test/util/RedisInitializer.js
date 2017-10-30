const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

class RedisInitializer {
    constructor(client){
        this.client = client;
        return this;
    }

    executeScript(scriptPath) {
        if (scriptPath && fs.existsSync(scriptPath) && fs.statSync(scriptPath).isFile()) {
            return fs.readFileAsync(scriptPath)
                .then(this.redisEval.bind(this));
        }
        return Promise.reject(new TypeError('invalid script path.'));
    }

    redisEval(scriptData) {
        const self = this;
        return new Promise((resolve, reject) => {
            self.client.eval(scriptData, 0, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = RedisInitializer;
