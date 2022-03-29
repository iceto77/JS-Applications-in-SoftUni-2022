import * as request from './requester.js';

const host = 'http://localhost:3030/data/books';

export const getAll = () => request.get(`${host}?sortBy=_createdOn%20desc`);

export const create = (bookData) => request.post(host, bookData);

export const getOne = (bookId) => request.get(`${host}/${bookId}`);

export const edit = (bookData, bookId) => request.put(`${host}/${bookId}`, bookData);

export const remove = (bookId) => request.del(`${host}/${bookId}`);

export const getMyAll = (userId) => {
    const query = `where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    return request.get(`${host}?${query}`);
};