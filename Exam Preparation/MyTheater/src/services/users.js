import * as request from './requester.js';
import * as util from './util.js';

const host = 'http://localhost:3030/users';

export const login = (email, password) =>
    request.post(`${host}/login`, { email, password })
        .then(user => {
            util.saveUser(user);
            return user;
        });

export const register = (email, password) =>
    request.post(`${host}/register`, { email, password })
        .then(user => {
            util.saveUser(user);
            return user;
        });

export const logout = () =>
    fetch(`${host}/logout`, { headers: { 'X-Authorization': util.getToken() } })
        .then(() => {
            util.clearUser();
        });