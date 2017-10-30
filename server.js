require('dotenv').config();
const express = require('express');
const getRandomWordModule = require('./src/controllers/modules/getRandomWordModule');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello There!!');
});

app.get('/word', (req, res) => {
    getRandomWordModule.getRandomWord()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(() => {
            res.status(400).send('Something went wrong :(!');
        });
});

const server = app.listen(3000, () => {
    console.log('=====================> Random words app listening on port 3000!');
});

module.exports = server;
