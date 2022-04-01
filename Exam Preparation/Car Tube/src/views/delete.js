import * as cars from '../services/cars.js';

export const deleteView = (ctx) => {
    const carId = ctx.params.carId;
    if (confirm(`Do you realy want to delete this car?`)) {
        cars.remove(carId);
        ctx.page.redirect('/catalog');
    }
}