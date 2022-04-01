import { html, nothing } from '../lib.js';

import * as cars from '../services/cars.js';


const detailsTemplate = (car, user) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>

            <p class="description-para">${car.description}</p>

            <div class="listings-buttons">
                ${user != undefined && car._ownerId == user._id
                    ? html`<a class="button" href="/cars/${car._id}/edit">Edit</a>
                        <a class="button" href="/cars/${car._id}/delete">Delete</a>`
                    : nothing
                }
            </div>
        </div>
    </section>`;

// <button @click=${onLike} 

// да се промени спорд условието на задачата
export const detailsView = (ctx) => {
    cars.getOne(ctx.params.carId)
        .then(car => {
            ctx.render(detailsTemplate(car, ctx.user));
        });
};


/*
                ${showEditDelBtn -> let showEditDelBtn = Boolean(ctx.user != undefined && book._ownerId == userId);
                    ? html`<a class="button" href="/books/${book._id}/edit">Edit</a>
                           <a class="button" href="/books/${book._id}/delete">Delete</a>`
                    : nothing
                }
                ${showLikeBtn  -> let showLikeBtn = Boolean(ctx.user != undefined && book._ownerId != userId && !isLiked);
                    ? html`<button @click=${onLike} class="button">Like</button>`
                    : nothing
                }
*/