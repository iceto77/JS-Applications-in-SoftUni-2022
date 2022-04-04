import { html } from '../lib.js';

import * as pets from '../services/pets.js';
import { dataValidator } from '../services/validator.js';

const editTemplate = (pet, submitHandler) => html`
    <section id="editPage">
        <form @submit=${submitHandler}  class="editForm">
            <img src=${pet.image}>
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" .value=${pet.name}>
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" .value=${pet.breed}>
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" .value=${pet.age}>
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" .value=${pet.weight}>
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" .value=${pet.image}>
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>`;

export const editView = (ctx) => {
    if (ctx.user != undefined) {
        const petId = ctx.params.petId;
        const submitHandler = (e) => {
            e.preventDefault();
            const petData = Object.fromEntries(new FormData(e.currentTarget));

            if (dataValidator(petData)) {
                return alert('All fileds should be filled');
            };

            pets.edit(petData, petId)
                .then(() => {
                    ctx.page.redirect(`/pets/${petId}`);
                })
        };

        pets.getOne(petId)
            .then(pet => {
                ctx.render(editTemplate(pet, submitHandler));
            });
    } else {
        ctx.page.redirect(`/`);
    }
}