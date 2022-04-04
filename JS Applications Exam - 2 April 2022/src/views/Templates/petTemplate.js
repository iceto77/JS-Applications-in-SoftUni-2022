import { html } from '../../lib.js';

export const petTemplate = (pet) => html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src=${pet.image}>
        </article>
        <h2 class="name">${pet.name}</h2>
        <h3 class="breed">${pet.breed}</h3>
        <div class="action">
            <a class="btn" href="/pets/${pet._id}">Details</a>          
        </div>
    </div>`;