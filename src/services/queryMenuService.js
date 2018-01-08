'use strict'

const http = require('http');
const https = require('https');
const { URL } = require('url');

const queryMenuService = async (url) => {
    return await fetchAllMenuItems(url);
};

const fetchAllMenuItems = async (url, result = [], page = 1) => {
    let response;
    
    try {
        response = await fetchUrl(url, page);
    } catch(error) {
        return result;
    }
    
    if (!response.menus) {
        return result;
    }

    result = result.concat(response.menus);

    if (!response.pagination) {
        return result;
    }

    const nextPage = getNextPage(response.pagination);
    if (!nextPage) {
        return result;
    }

    return await fetchAllMenuItems(url, result, nextPage);
};

const fetchUrl = async (url, page) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'http:' ? http : https;

    urlObj.searchParams.set('page', page);

    return new Promise((resolve, reject) => {
        const req = protocol.request({
            host: urlObj.host,
            path: [urlObj.pathname, urlObj.search].join(''),
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }, (res) => {
            let output = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                output += chunk
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(output));
                } catch (e) {
                    reject(new Error('JSON parse failed'));
                }
            });
        });
        req.on('error', (error) => {
            reject(error);
        });
        req.end();
    });
}

const getNextPage = (pagination) => {
    const totalPageNumbers = pagination.total / pagination.per_page; 
    let nextPage = pagination.current_page + 1;
    return nextPage <= totalPageNumbers ? nextPage : false;
}

module.exports = {
    getItems: queryMenuService
};
