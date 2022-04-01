import { html } from '../lib.js';

import * as cars from '../services/cars.js';
import { carTemplate } from './carTemplate.js';


const catalogTemplate = (cars) => html`
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">
            ${cars.length == 0
                ? html`<p class="no-cars">No cars in database.</p>`
                : html`${cars.map(x => carTemplate(x))}`
            }
        </div>
    </section>`;

export const catalogView = (ctx) => {
    cars.getAll()
        .then(cars => {
            ctx.render(catalogTemplate(cars));
        })

}