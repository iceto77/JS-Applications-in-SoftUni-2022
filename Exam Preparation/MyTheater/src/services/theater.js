import * as request from './requester.js';

const host = 'http://localhost:3030/data/theaters';

export const getAll = () => request.get(`${host}?sortBy=_createdOn%20desc&distinct=title`);

export const create = (theaterData) => request.post(host, theaterData);

export const getOne = (theaterId) => request.get(`${host}/${theaterId}`);

export const edit = (theaterData, theaterId) => request.put(`${host}/${theaterId}`, theaterData);

export const remove = (theaterId) => request.del(`${host}/${theaterId}`);

export const getMyAll = (userId) => {
    const query = `where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
    return request.get(`${host}?${query}`);
};