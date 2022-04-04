import { html } from '../lib.js';

import * as pets from '../services/pets.js';
import { petTemplate } from './Templates/petTemplate.js';

const dashboardTemplate = (pets) => html`
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
            ${pets.length == 0
                ? html`<div>
                            <p class="no-pets">No pets in dashboard</p>
                       </div>`
                : html`${pets.map(x => petTemplate(x))}`
            }
        </div>
    </section>`;

export const dashboardView = (ctx) => {
    pets.getAll()
        .then(pets => {
            ctx.render(dashboardTemplate(pets));
        })
}