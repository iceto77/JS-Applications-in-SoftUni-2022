import { html } from '../lib.js';

const guestLinks = html`
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`;

const userLinks = (user) => html`
    <li><a href="/profile">Profile</a></li>
    <li><a href="/create">Create Event</a></li>
    <li><a href="/logout">Logout</a></li>`;

const navigationTemplate = (user) => html`
<header>
            <nav>
                <a href="/">Theater</a>
                <ul>
                    ${user
                        ? userLinks(user.username)
                        : guestLinks
                    }
                </ul>
            </nav>
        </header>`;

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user);
}