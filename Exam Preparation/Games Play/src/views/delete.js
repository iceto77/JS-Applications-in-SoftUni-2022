import * as games from '../services/games.js';

export const deleteView = (ctx) => {
    const gameId = ctx.params.gameId;
    if (confirm(`Do you really want to delete this game?`)) {
        games.remove(gameId);
        ctx.page.redirect('/');
    }
}