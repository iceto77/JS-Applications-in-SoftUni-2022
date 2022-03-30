import { html } from '../lib.js';

import * as games from '../services/games.js';
import { gameCardTemplate } from './gameCard.js';

const homeTemplate = (games) => html`
    <section id="welcome-world">    
        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero">    
        <div id="home-page">
            <h1>Latest Games</h1>
            ${games.length == 0
                ? html`<p class="no-articles">No games yet</p>`
                : html`${games.map(x => gameCardTemplate(x))}`
            }              
        </div>
    </section>`;

export const homeView = (ctx) => {
    games.getLatest()
        .then(games => {
            ctx.render(homeTemplate(games));
        });
}