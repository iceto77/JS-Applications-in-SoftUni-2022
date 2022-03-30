import { html } from '../lib.js';

export const eventTemplate = (theater) => html`
<div class="eventsInfo">
    <div class="home-image">
        <img src=${theater.imageUrl}>
    </div>
    <div class="info">
        <h4 class="title">${theater.title}</h4>
        <h6 class="date">${theater.date}</h6>
        <h6 class="author">${theater.author}</h6>
        <div class="info-buttons">
            <a class="btn-details" href="/theaters/${theater._id}">Details</a>
        </div>
    </div>
</div>`;