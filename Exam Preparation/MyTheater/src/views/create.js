import { html } from '../lib.js';

import * as theaters from '../services/theater.js';
import { dataValidator } from '../services/validator.js';


const createTemplate = (submitHandler) => html`
    <section id="createPage">
        <form @submit=${submitHandler} class="create-form">
            <h1>Create Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" value="">
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year">
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author">
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" name="description" placeholder="Description"></textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>`;

export const createView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();
        const theaterData = Object.fromEntries(new FormData(e.currentTarget));
        if (dataValidator(theaterData)) {
            return alert('All fileds should be filled');
        };
        theaters.create(theaterData)
            .then(() => {
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert(err);
            });
    }
    ctx.render(createTemplate(submitHandler));
}