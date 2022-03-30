import * as theaters from '../services/theater.js';


export const deleteView = (ctx) => {
    const theaterId = ctx.params.theaterId;
    if (confirm(`Do you really want to delete this theater event?`)) {
        theaters.remove(theaterId);
        ctx.page.redirect('/');
    }
}