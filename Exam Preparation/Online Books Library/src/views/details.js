import { html, nothing } from '../lib.js';

import * as books from '../services/books.js';
import * as likes from '../services/likes.js';

const detailsTemplate = (book, onLike, bookLikes, showEditDelBtn, showLikeBtn) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                ${showEditDelBtn
                    ? html`<a class="button" href="/books/${book._id}/edit">Edit</a>
                           <a class="button" href="/books/${book._id}/delete">Delete</a>`
                    : nothing
                }
                ${showLikeBtn
                    ? html`<button @click=${onLike} class="button">Like</button>`
                    : nothing
                }
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${bookLikes}</span>
                </div>

            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description} ...</p>
        </div>
    </section>`;

export const detailsView = async (ctx) => {
    let bookId = ctx.params.bookId;
    let userId = ctx.user;
    let isLiked = true;
    if(ctx.user != undefined){
        userId = ctx.user._id;
        isLiked = await likes.isLiked(userId, bookId);
    }    
    let bookLikes = await likes.count(bookId);
    let book = await books.getOne(bookId); 

    const onLike = async () => {
        await likes.add({ bookId })
            .then(() => {
                ctx.page.redirect(`/books/${bookId}`);
            });
    }

    let showEditDelBtn = Boolean(ctx.user != undefined && book._ownerId == userId);
    let showLikeBtn = Boolean(ctx.user != undefined && book._ownerId != userId && !isLiked);

 
    ctx.render(detailsTemplate(book, onLike, bookLikes, showEditDelBtn, showLikeBtn));
};

/*
export const movieView = async (ctx) => {
    let movieId = ctx.params.movieId;

    const onLike = () => {
        likeService.like(movieId)
            .then(() => {
                ctx.page.redirect(`/movies/${movieId}`);
            });
    }

    const onUnlike = async () => {
        let like = await likeService.getOne(movieId, ctx.user._id);
        await likeService.unLike(like._id);

        ctx.page.redirect(`/movies/${movieId}`);
    }

    let movie = await movieService.getOne(movieId);
    let likes = await likeService.getMovieLikes(movieId);

    movie.likes = likes.length;
    let isLiked = likes.some(x => x._ownerId == ctx.user._id);

    ctx.render(movieTemplate(movie, isLiked, onLike,onUnlike));
};
*/