import { html } from "../lib.js";

const guestLinks = html`
  <li><a href="/login">Login</a></li>
  <li><a href="/register">Register</a></li>`;

const userLinks = (user) => html` 
  <li><a href="/create">Create Album</a></li>
  <li><a href="/logout">Logout</a></li>`;

const navigationTemplate = (user) => html` <header>
  <nav>
    <img src="/images/headphones.png" />
    <a href="/">Home</a>
    <ul>
      <!--All user-->
      <li><a href="/catalog">Catalog</a></li>
      <li><a href="/search">Search</a></li>
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

/*
const navigationTemplate = (user) => html`
    <h1><a class="home" href="/">GamesPlay</a></h1>
    <nav>
        <a href="/catalog">All games</a>
        ${user
            ? userLinks(user.username)
            : guestLinks
        }        
    </nav>`;
*/
