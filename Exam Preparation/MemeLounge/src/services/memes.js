import * as request from './requester.js';

const host = 'http://localhost:3030/data/memes';

export const create = (memeData) => request.post(host, memeData);

export const getAll = () => request.get(`${host}?sortBy=_createdOn%20desc`);

export const getOne = (memeId) => request.get(`${host}/${memeId}`);

export const edit = (memeData, memeId) => request.put(`${host}/${memeId}`, memeData);

export const remove = (memeId) => request.del(`${host}/${memeId}`);

export const getMyAll = (userId) => {
    const query = `where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
    return request.get(`${host}?${query}`);
};