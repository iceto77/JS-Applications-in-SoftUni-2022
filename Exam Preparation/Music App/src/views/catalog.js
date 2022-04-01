import { html } from '../lib.js';

import * as albums from '../services/album.js';
import { albumTemplate } from './Templates/albumTemplate.js';

const catalogTemplate = (albums, showBtn) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>
        ${albums.length == 0
            ? html`<p>No Albums in Catalog!</p>`
            : html`${albums.map(x => albumTemplate(x, showBtn))}`
        }
    </section>`;

export const catalogView = (ctx) => {
    let showBtn = !(ctx.user == undefined);
    albums.getAll(showBtn) 
        .then(albums => {
            ctx.render(catalogTemplate(albums, showBtn));
        })
}