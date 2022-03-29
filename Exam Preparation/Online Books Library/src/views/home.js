import { html } from '../lib.js';

import * as books from '../services/books.js';
import { bookTemplate } from './bookTemplate.js';

const homeTemplate = (books) => html`

    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        <ul class="other-books-list">
            ${books.length == 0
                ? html`<p class="no-books">No books in database!</p>`
                : html`${books.map(x => bookTemplate(x))}`
            }
        </ul>        
    </section>`;

export const homeView = (ctx) => {
    books.getAll()
    .then(books => {
        ctx.render(homeTemplate(books));
    })
}

