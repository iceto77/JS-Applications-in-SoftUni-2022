import * as request from './requester.js';

const host = 'http://localhost:3030/data/cars';

export const getAll = () => request.get(`${host}?sortBy=_createdOn%20desc`);

export const create = (carData) => request.post(host, carData);

export const getOne = (carId) => request.get(`${host}/${carId}`);

export const edit = (carData, carId) => request.put(`${host}/${carId}`, carData);

export const remove = (carId) => request.del(`${host}/${carId}`);

export const getMyAll = (userId) => {
    const query = `where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
    return request.get(`${host}?${query}`);
};

export const getByYear = (year) => {
    const query = `where=year%3D${year}`;
    return request.get(`${host}?${query}`);
};
