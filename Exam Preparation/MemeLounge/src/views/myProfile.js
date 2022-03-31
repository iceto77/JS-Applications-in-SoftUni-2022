import { html } from '../lib.js';

import * as memes from '../services/memes.js';
import { memeCard } from './Templates/memeCard.js';

const myProfileTemplate = (user, memes, memesCount) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src=${`/images/${user.gender}.png`}>
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${memesCount}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${memesCount == 0
                    ? html`<p class="no-memes">No memes in database.</p>`
                    : html`${memes.map(x => memeCard(x))}`
                }            
        </div>
    </section>`;

export const myProfileView = (ctx) => {
    const userId = ctx.user._id;
    memes.getMyAll(userId)
        .then(memes => {
            ctx.render(myProfileTemplate(ctx.user, memes, memes.length));
        })
}