import { html } from '../lib.js';

import * as books from '../services/books.js';
import { dataValidator } from '../services/validator.js';


const editTemplate = (book, submitHandler) => html`
    <section id="edit-page" class="edit">
        <form @submit=${submitHandler} id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" .value=${book.title}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description"
                            .value=${book.description}>Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold, bleak place in the long winter months. So when she spots a deer in the forest being pursued by a wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and killing something so precious comes at a price ...</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" .value=${book.type}>
                            <option value="Fiction" selected>Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>`;

export const editView = (ctx) => {
    const bookId = ctx.params.bookId;
    const submitHandler = (e) => {
        e.preventDefault();

        const bookData = Object.fromEntries(new FormData(e.currentTarget));
        if (dataValidator(bookData)) {
            return alert('All fileds should be filled');
        };
        books.edit(bookData, bookId)
            .then(() => ctx.page.redirect(`/books/${bookId}`));
    };
    books.getOne(bookId)
        .then(book => ctx.render(editTemplate(book, submitHandler)));
};