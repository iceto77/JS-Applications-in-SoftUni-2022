import { html, page, nothing } from '../lib.js';

import * as memes from '../services/memes.js';

const detailsTemplate = (meme, ctx) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
                ${ctx.user != undefined && meme._ownerId == ctx.user._id
                    ? html`<a class="button warning" href="/memes/${meme._id}/edit">Edit</a>
                           <button class="button danger" @click=${() => onClick(ctx, meme._id)}>Delete</button>`
                    : nothing
                }
            </div>
        </div>
    </section>`;

export const detailsView = (ctx) => {
    memes.getOne(ctx.params.memeId)
        .then(meme => {
            ctx.render(detailsTemplate(meme, ctx));
        });
};

function onClick(ctx, memeId) {
    ctx.page.redirect(`/memes/${memeId}/delete`);
}