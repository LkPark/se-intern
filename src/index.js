'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const validateMenuMiddleware = require('./middlewares').validateMenuMiddleware;

const PORT = process.env.PORT;
const DEV_MODE = process.env.NODE_ENV === 'development' || false;

const app = express();

app.use(cors());

app.use('/validate/menu/1', (req, res, next) => {
    res.locals.url = 'https://backend-challenge-summer-2018.herokuapp.com/challenges.json?id=1&page=1';
    next();
});

app.use('/validate/menu/2', (req, res, next) => {
    res.locals.url = 'https://backend-challenge-summer-2018.herokuapp.com/challenges.json?id=2&page=1';
    next();
});

app.use(bodyParser.json(), validateMenuMiddleware);

app.use((req, res, next) => {
    res.status(200);
    res.json({
        'Validate Menu 1': `${req.protocol}://${req.get('host')}/validate/menu/1`,
        'Validate Menu 2': `${req.protocol}://${req.get('host')}/validate/menu/2`,
    });
});

app.listen(PORT, () => {
    console.info(`Started on ${PORT}`);
    DEV_MODE && console.info(`Development mode enabled`);
});
