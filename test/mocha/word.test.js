/* eslint-disable no-unused-expressions */
const supertest = require('supertest');
const { expect } = require('chai');

describe('GET /word.', () => {
    it('Should return a random word', () => {
        const agent = supertest.agent(require('../../server'));
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
