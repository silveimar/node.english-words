/* eslint-disable no-unused-expressions */
const supertest = require('supertest');
const { expect } = require('chai');

describe(' word endpoint IT test', () => {
    it('should return a random word', () => {
        const agent = supertest.agent(require('../../server'));
        return agent.get('/word')
            .expect(200)
            .then((res) => {
                expect(res.body).to.not.be.null;
                return;
            })
            .catch(function (err) {
                throw err;
            });
    });
});
