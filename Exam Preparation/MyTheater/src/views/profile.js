import { html } from '../lib.js';

import * as theaters from '../services/theater.js';
import { profileCardTemplate } from './profileCardTemplate.js';

const profileTemplate = (theaters, user) => html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${user.email}</h2>
        </div>
        <div class="board">
            ${theaters.length == 0
                ? html` <div class="no-events">
                            <p>This user has no events yet!</p>
                        </div>`
                : html`${theaters.map(x => profileCardTemplate(x))}`
            }
        </div>
    </section>`;

export const profileView = (ctx) => {
    let user = ctx.user;
    theaters.getMyAll(ctx.user._id)
        .then(theaters => {
            ctx.render(profileTemplate(theaters, user));
        });
};

