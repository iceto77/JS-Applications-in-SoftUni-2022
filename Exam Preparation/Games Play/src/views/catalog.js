import { html } from '../lib.js';

import * as games from '../services/games.js';
import { gameTemplate } from './gameTemplate.js';

const catalogTemplate = (games) => html`
    <section id="catalog-page">
        <h1>All Games</h1>
            ${games.length == 0
                ? html`<h3 class="no-articles">No articles yet</h3>`
                : html`${games.map(x => gameTemplate(x))}`
            }        
    </section>`;

export const catalogView = (ctx) => {
    games.getAll()
        .then(games => {
            ctx.render(catalogTemplate(games));
        });
}