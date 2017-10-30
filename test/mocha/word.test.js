/* eslint-disable no-unused-expressions */
const supertest = require('supertest');
const { expect } = require('chai');
const bapsePath =require('app-root-dir').get();
const RedisInitializer = require('../util/RedisInitializer');

describe('GET /word.', () => {
    let agent;

    before((done) => {
        agent = supertest.agent(require('../../server'));
        console.log('Initializing REDIS DATA!');

        const client = require(`${bapsePath}/src/init/redis`).getRedisClient();
        initializer = new RedisInitializer(client);

        initializer.executeScript(`${bapsePath}/test/resources/redis-data.lua`)
        .then(() => {
            done();
        })
        .catch((err) =>{
            throw err;
        });
    });

    it('Should return a random word', () => {
        return agent.get('/word')
            .expect(200)
            .then((res) => {
                expect(res.body).to.not.be.null;
                return;
            })
            .catch((err) => {
                throw err;
            });
    });
});
