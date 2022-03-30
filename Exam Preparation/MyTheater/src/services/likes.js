import * as request from './requester.js';

const host = 'http://localhost:3030/data/likes';

export const add = (likeData) => request.post(host, likeData);

export const count = (theaterId) => {
    const query = `where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`;
    return request.get(`${host}?${query}`);
};

export const isLiked = (userId, theaterId) => {
    const query = `where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    return request.get(`${host}?${query}`); 
};
