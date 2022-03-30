import * as request from './requester.js';

const host = 'http://localhost:3030/data/comments';

export const getAll = (gameId) => {
    const query = `where=gameId%3D%22${gameId}%22`;
    return request.get(`${host}?${query}`);
}

export const create = (commentData) => request.post(host, commentData);
