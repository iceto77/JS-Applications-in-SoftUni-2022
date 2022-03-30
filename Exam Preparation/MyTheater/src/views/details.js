import { html, nothing } from '../lib.js';

import * as theaters from '../services/theater.js';
import * as likes from '../services/likes.js';

const detailsTemplate = (theater, likeHandler, totalLikes, ctx, isLiked) => html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${theater.title}</h1>
                <div>
                    <img src=${theater.imageUrl} />
                </div>
            </div>

            <div class="details">
                <h3>Theater Description</h3>
                <p>${theater.description}</p>
                <h4>Date: ${theater.date}</h4>
                <h4>Author: ${theater.author}</h4>
                <div class="buttons">
                    ${ctx.user != undefined && theater._ownerId == ctx.user._id
                        ? html` <a class="btn-delete" href="/theaters/${theater._id}/delete">Delete</a>
                                <a class="btn-edit" href="/theaters/${theater._id}/edit">Edit</a>`
                        : nothing
                    }
                    ${ctx.user != undefined && theater._ownerId != ctx.user._id && !isLiked
                        ? html`<a @click=${likeHandler} class="btn-like">Like</a>`
                        : nothing
                    }
                </div>
                <p class="likes">Likes: ${totalLikes}</p>
            </div>
        </div>
    </section>`;

export const detailsView = async (ctx) => {
    let theaterId = ctx.params.theaterId;
    let userId = ctx.user;
    let isLiked = true;
    if(ctx.user != undefined){
        userId = ctx.user._id;
        isLiked = await likes.isLiked(userId, theaterId);
    }
    let totalLikes = await likes.count(theaterId);
    let theater = await theaters.getOne(theaterId); 

    const likeHandler = async () => {
        //let theaterId = theaterId;
        await likes.add({ theaterId })
            .then(() => {
                ctx.page.redirect(`/theaters/${theaterId}`);
            });
    }

    //let showEditDelBtn = Boolean(ctx.user != undefined && theater._ownerId == userId);
    //let showLikeBtn = Boolean(ctx.user != undefined && theater._ownerId != userId && !isLiked);

    ctx.render(detailsTemplate(theater, likeHandler, totalLikes, ctx, isLiked));
    //ctx.render(detailsTemplate(theater, likeHandler, totalLikes, showEditDelBtn, showLikeBtn));
};