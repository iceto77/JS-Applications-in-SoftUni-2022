import * as request from './requester.js';

const host = 'http://localhost:3030/data/donation';

export const add = (donationData) => request.post(host, donationData);

export const count = (petId) => {
    const query = `where=petId%3D%22${petId}%22&distinct=_ownerId&count`;
    return request.get(`${host}?${query}`);
};

export const isDonate = (userId, petId) => {
    const query = `where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    return request.get(`${host}?${query}`); 
};