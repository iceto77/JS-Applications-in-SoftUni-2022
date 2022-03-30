import { html } from '../lib.js';

import * as games from '../services/games.js';
import { dataValidator } from '../services/validator.js';

const editTemplate = (game, submitHandler) => html`
    <section id="edit-page" class="auth">
        <form @submit=${submitHandler} id="edit">
            <div class="container">
    
                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" .value=${game.title}>
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" .value=${game.category}>
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary" .value=${game.summary}></textarea>
                <input class="btn submit" type="submit" value="Edit Game">
    
            </div>
        </form>
    </section>`;

export const editView = (ctx) => {
    const gameId = ctx.params.gameId;
    const submitHandler = (e) => {
        e.preventDefault();
        const gameData = Object.fromEntries(new FormData(e.currentTarget));

        if (dataValidator(gameData)) {
            return alert('All fileds should be filled');
        };

        games.edit(gameData, gameId)
            .then(() => {
                ctx.page.redirect(`/games/${gameId}`);
            });
    };

    games.getOne(gameId)
        .then(game => {
            ctx.render(editTemplate(game, submitHandler));
        });
};