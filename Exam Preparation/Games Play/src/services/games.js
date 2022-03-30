import * as request from './requester.js';

const host = 'http://localhost:3030/data/games';

export const getAll = () => request.get(`${host}?sortBy=_createdOn%20desc`);

export const getLatest = () => request.get(`${host}?sortBy=_createdOn%20desc&distinct=category`);

export const create = (gameData) => request.post(host, gameData);

export const getOne = (gameId) => request.get(`${host}/${gameId}`);

export const edit = (gameData, gameId) => request.put(`${host}/${gameId}`, gameData);

export const remove = (gameId) => request.del(`${host}/${gameId}`);

// export const getMyAll = (userId) => {
//     const query = `where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
//     return request.get(`${host}?${query}`);
// };

// export const getByYear = (year) => {
//     const query = `where=year%3D${year}`
//     return request.get(`${host}?${query}`);
// };


//този файл ще се променя според типа на данните