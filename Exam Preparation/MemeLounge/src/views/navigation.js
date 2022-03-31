import { html } from '../lib.js';

const guestLinks = html`
    <div class="guest">
        <a class="active" href="/">Home Page</a>
        <a href="/catalog">All Memes</a>
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>

    </div>`;

const userLinks = (user) => html`
    <div class="user">
        <a href="/catalog">All Memes</a>
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${user.email}</span>
            <a href="/profile">My Profile</a>
            <a href="/logout">Logout</a>
        </div>
    </div>`;

const navigationTemplate = (user) => html`
<nav>    
    
    ${user
        ? userLinks(user)
        : guestLinks
    }
</nav>`;

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user);
};
