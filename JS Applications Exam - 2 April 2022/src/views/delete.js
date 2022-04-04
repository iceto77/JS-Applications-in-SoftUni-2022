import * as pets from '../services/pets.js';

export const deleteView = (ctx) => {
    if (ctx.user != undefined) {
        const petId = ctx.params.petId;
        if (confirm(`Do you realy want to delete this car?`)) {
            pets.remove(petId)
            ctx.page.redirect('/');
        }
    } else {
        ctx.page.redirect(`/`);
    }
}