import * as request from './requester.js';

const host = 'http://localhost:3030/data/pets';

export const getAll = () => request.get(`${host}?sortBy=_createdOn%20desc&distinct=name`);

export const create = (petData) => request.post(host, petData);

export const getOne = (petId) => request.get(`${host}/${petId}`);

export const edit = (petData, petId) => request.put(`${host}/${petId}`, petData);

export const remove = (petId) => request.del(`${host}/${petId}`);