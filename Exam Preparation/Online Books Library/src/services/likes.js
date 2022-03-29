import * as request from './requester.js';

const host = 'http://localhost:3030/data/likes';

export const add = (likeData) => request.post(host, likeData);

export const count = (bookId) => {
    const query = `where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`;
    return request.get(`${host}?${query}`);
};

export const isLiked = (userId, bookId) => {
    const query = `where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    return request.get(`${host}?${query}`); 
};



//export const like = (movieId) => request.post(baseUrl, { movieId });

//export const unLike = (likeId) => request.del(`${baseUrl}/${likeId}`);
