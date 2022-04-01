import { html } from '../lib.js';

import * as cars from '../services/cars.js';
import { carTemplate } from './carTemplate.js';

const myListingsTemplate = (cars) => html`
    <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
                ${cars.length == 0
                    ? html`<p class="no-cars"> You haven't listed any cars yet.</p>`
                    : html`${cars.map(x => carTemplate(x))}`
                }                
            </div>
        </section>`;

export const myListingsView = (ctx) => {
    const userId = ctx.user._id;
    cars.getMyAll(userId)
        .then(cars => {
            ctx.render(myListingsTemplate(cars));
        })

}