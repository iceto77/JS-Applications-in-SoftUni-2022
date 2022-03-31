import { html } from '../lib.js';

import * as memes from '../services/memes.js';
import { showNotification } from '../services/showNotification.js';
import { dataValidator } from '../services/validator.js';


const editTemplate = (meme, submitHandler) => html`
<section id="edit-meme">
    <form @submit=${submitHandler} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>

            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}></textarea>

            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>

            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export const editView = (ctx) => {
    const memeId = ctx.params.memeId;
    const submitHandler = (e) => {
        e.preventDefault();
        const memeData = Object.fromEntries(new FormData(e.currentTarget));

        if (dataValidator(memeData)) {
            //return alert('All fileds should be filled');
            return showNotification('All fileds should be filled');
        };

        memes.edit(memeData, memeId)
            .then(() => {
                ctx.page.redirect(`/memes/${memeId}`);
            })
            .catch(err => {
                showNotification(err.message);
                //alert(err);
            });
    };

    memes.getOne(memeId)
        .then(meme => {
            ctx.render(editTemplate(meme, submitHandler));
        });
};