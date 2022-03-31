import { html } from '../lib.js';

import * as memes from '../services/memes.js';
import { memeTemplate } from './Templates/memeTemplate.js';

const catalogTemplate = (memes) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${memes.length == 0
                ? html`<p class="no-memes">No memes in database.</p>`
                : html`${memes.map(x => memeTemplate(x))}`
            }
        </div>
    </section>`;

export const catalogView = (ctx) => {
    memes.getAll()
        .then(memes => {
            ctx.render(catalogTemplate(memes));
        })

}