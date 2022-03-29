import { html } from '../lib.js';

const guestLinks = html`
    <div id="guest">
        <a class="button" href="/login">Login</a>
        <a class="button" href="/register">Register</a>
    </div>`;

const userLinks = (email) => html`
    <div id="user">
        <span>Welcome, ${email}</span>
        <a class="button" href="/mybooks">My Books</a>
        <a class="button" href="/create">Add Book</a>
        <a class="button" href="/logout">Logout</a>
    </div>`;

const navigationTemplate = (user) => html`
<header id="site-header">
    <nav class="navbar">
        <section class="navbar-dashboard">
            <a href="/">Dashboard</a>
            ${user
                ? userLinks(user.email)
                : guestLinks
            }
        </section>
    </nav>
</header>`;

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user);
}