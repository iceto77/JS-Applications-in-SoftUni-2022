import { html } from '../lib.js';

import * as books from '../services/books.js';
import { dataValidator } from '../services/validator.js';

const createTemplate = (submitHandler) => html`
    <section id="create-page" class="create">
        <form @submit=${submitHandler} id="create-form" action="" method="">
            <fieldset>
                <legend>Add new Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" placeholder="Title">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" placeholder="Description"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" placeholder="Image">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type">
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Add Book">
            </fieldset>
        </form>
    </section>`;

export const createView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        const bookData = Object.fromEntries(new FormData(e.currentTarget));
        if (dataValidator(bookData)) {
            return alert('All fileds should be filled');
        };
        books.create(bookData)
            .then(() => {
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert(err);
            });
    }
    ctx.render(createTemplate(submitHandler));
}