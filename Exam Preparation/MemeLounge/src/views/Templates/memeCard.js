import { html } from '../../lib.js';

export const memeCard = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
                <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="/memes/${meme._id}">Details</a>
    </div>`;