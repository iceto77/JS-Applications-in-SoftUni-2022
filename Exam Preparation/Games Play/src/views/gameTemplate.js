import { html } from '../lib.js';

export const gameTemplate = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${game.imageUrl}>
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/games/${game._id}" class="details-button">Details</a>
        </div>
    </div>`;