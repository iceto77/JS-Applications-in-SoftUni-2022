import { html, nothing } from '../lib.js';

import * as games from '../services/games.js';
import * as comments from '../services/comments.js';
import { commentTemplate } from './commentTemplate.js';
import { addCommentTemplate } from './addCommentTemplate.js';

const detailsTemplate = (game, user, allComments, submitHandler) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl} />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
            <p class="text">${game.summary}</p>
            <div class="details-comments">
                <h2>Comments:</h2>
                <ul>
                    ${allComments.length == 0 
                        ? html`<p class="no-comment">No comments.</p>`
                        : html`${allComments.map(x => commentTemplate(x))}`
                    }
                </ul>                    
            </div>
            ${user != undefined && game._ownerId == user._id
                ? html`<div class="buttons">
                            <a href="/games/${game._id}/edit" class="button">Edit</a>
                            <a href="/games/${game._id}/delete" class="button">Delete</a>
                        </div>`
                : nothing
            }
            ${user != undefined && game._ownerId != user._id
                ? addCommentTemplate(submitHandler)
                : nothing
            }            
        </div>
    </section>`;




export const detailsView = async (ctx) => {
    const gameId = ctx.params.gameId;
    const allComments = await comments.getAll(gameId);
    const submitHandler = async (e) => {
        e.preventDefault();
        const { comment } = Object.fromEntries(new FormData(e.currentTarget));

        await comments.create({ gameId, comment})
            .then(() => {
                e.target.reset();
                ctx.page.redirect(`/games/${gameId}`);
            });
    }
    await games.getOne(ctx.params.gameId)
        .then(game => {
            ctx.render(detailsTemplate(game, ctx.user, allComments, submitHandler));
        });
};