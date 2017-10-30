require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const getRandomWordModule = require('./src/controllers/modules/getRandomWordModule');

const app = express();
app.use(helmet()); // implements 6 measures for security headers

app.get('/', (req, res) => {
    res.send('Hello There!!');
});

app.get('/word', (req, res) => {
    getRandomWordModule.getRandomWord()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log('=====================> ERROR', error);
            res.status(400).send('Something went wrong :(!');
        });
});

require(`./src/init/redis`);

const server = app.listen(3000, () => {
    console.log('=====================> Random words app listening on port 3000!');
});

server.timeout = 600000;
module.exports = server;
