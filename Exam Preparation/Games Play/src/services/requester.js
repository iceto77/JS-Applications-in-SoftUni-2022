import * as authService from './util.js';

const request = (method, url, data) => {
    let options = {};
    let token = authService.getToken();

    if (method != 'GET') {
        options.method = method;
        options.headers = {
            'content-type': 'application/json'
        };
        if (token) {
            options.headers['X-Authorization'] = token;
        }
        options.body = JSON.stringify(data);
    }
    let result = fetch(url, options)
        .then(res => res.json());
    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');