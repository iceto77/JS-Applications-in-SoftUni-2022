import { html } from '../lib.js';

const guestLinks = html`
    <div id="guest">
        <a href="/login">Login</a>
         <a href="/register">Register</a>
    </div>`;

const userLinks = (user) => html`
    <div id="profile">
        <a>Welcome ${user}</a>
        <a href="/mylistings">My Listings</a>
        <a href="/create">Create Listing</a>
        <a href="/logout">Logout</a>
    </div>`;

const navigationTemplate = (user) => html`
    <header>
        <nav>
            <a class="active" href="/">Home</a>
            <a href="/catalog">All Listings</a>
            <a href="/search">By Year</a>
            ${user
                ? userLinks(user.username)
                : guestLinks
            }
        </nav>
    </header>`;

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user);
};