
const client = require('../init/redis').getRedisClient();

module.exports.get = key => {
    return new Promise(function(resolve, reject) {
        client.getAsync(key)
        .then((data) => {
            console.log('=================>',data);
            if(data){
                resolve(data);
            }
            else{
                reject(new TypeError('Could not find key value'))
            }
        })
        .catch((err) => {
            reject(err);
        })
    });
}
