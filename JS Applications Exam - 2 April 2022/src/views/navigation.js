import { html } from '../lib.js';

const guestLinks = html`
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`;

const userLinks = (user) => html`
    <li><a href="/create">Create Postcard</a></li>
    <li><a href="/logout">Logout</a></li>`;

const navigationTemplate = (user) => html`
    <header>
        <nav>
            <section class="logo">
                <img src="/images/logo.png" alt="logo">
            </section>
            <ul>
                <!--Users and Guest-->
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                ${user
                    ? userLinks(user.username)
                    : guestLinks
                }                 
            </ul>
        </nav>
    </header>`;

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user);
};