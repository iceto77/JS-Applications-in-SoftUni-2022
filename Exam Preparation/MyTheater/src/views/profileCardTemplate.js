import { html } from '../lib.js';

export const profileCardTemplate = (theater) => html`
    <div class="eventBoard">
        <div class="event-info">
            <img src=${theater.imageUrl}>
            <h2>${theater.title}</h2>
            <h6>${theater.date}</h6>
            <a href="/theaters/${theater._id}" class="details-button">Details</a>
        </div>
    </div>`;