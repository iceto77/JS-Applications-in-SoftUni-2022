import { html } from '../lib.js';

import * as books from '../services/books.js';
import { bookTemplate } from './bookTemplate.js';

const myBooksTemplate = (books) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        <ul class="my-books-list">
            ${books.length == 0
                ? html`<p class="no-books">No books in database!</p>`
                : html`${books.map(x => bookTemplate(x))}`
            }
        </ul>        
    </section>`;

export const myBooksView = (ctx) => {
    books.getMyAll(ctx.user._id)
        .then(books => {
            ctx.render(myBooksTemplate(books));
        });
};