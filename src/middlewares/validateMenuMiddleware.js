'use strict'

const http = require('http');
const queryMenuService = require('../services').queryMenuService;
const validateMenuService = require('../services').validateMenuService;

const validateMenuMiddleware = async (req, res, next) => {
    if (req.error) {
        res.json({ 
            error : true
        });
        return next(error.message);
    }
    const url = res.locals.url;
    if (!url) {
        return next();
    }

    const menuList = await queryMenuService.getItems(url);
    const result = validateMenuService.validate(menuList);

    res.status(200);
    res.json(result);
};

module.exports = validateMenuMiddleware;
