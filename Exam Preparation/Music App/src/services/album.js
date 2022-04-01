import * as request from './requester.js';

const host = 'http://localhost:3030/data/albums';

export const getAll = () => request.get(`${host}?sortBy=_createdOn%20desc&distinct=name`);

export const create = (albumData) => request.post(host, albumData);

export const getOne = (albumId) => request.get(`${host}/${albumId}`);

export const edit = (albumData, albumId) => request.put(`${host}/${albumId}`, albumData);

export const remove = (albumId) => request.del(`${host}/${albumId}`);

export const getByName = (name) => {
    const query = `where=name%20LIKE%20%22${name}%22`;
    return request.get(`${host}?${query}`);
};