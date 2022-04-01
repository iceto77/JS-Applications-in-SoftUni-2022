import * as request from './requester.js';
import * as util from './util.js';

const host = 'http://localhost:3030/users';

export const login = (username, password) =>
    request.post(`${host}/login`, { username, password })
        .then(user => {
            util.saveUser(user);
            if (user.accessToken == undefined) {
                throw new Error(user.message);
            };
            return user;
        });

export const register = (regData) =>
    request.post(`${host}/register`, regData)
        .then(user => {
            util.saveUser(user);
            if (user.accessToken == undefined) {
                throw new Error(user.message);
            };
            return user;
        });

export const logout = () =>
    fetch(`${host}/logout`, { headers: { 'X-Authorization': util.getToken() } })
        .then(() => {
            util.clearUser();
        });