import { html } from '../lib.js';

import * as memes from '../services/memes.js';
import { showNotification } from '../services/showNotification.js';
import { dataValidator } from '../services/validator.js';


const createTemplate = (submitHandler) => html`
<section id="create-meme">
    <form @submit=${submitHandler} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">

            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>

            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">

            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export const createView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        const memeData = Object.fromEntries(new FormData(e.currentTarget));
        if (dataValidator(memeData)) {
            //return alert('All fileds should be filled');
            return showNotification('All fileds should be filled');
        };
        memes.create(memeData)
            .then(() => {
                ctx.page.redirect('/catalog');
            })
            .catch(err => {
                showNotification(err.message);
                //alert(err);
            });
    }
    ctx.render(createTemplate(submitHandler));
}