import { html } from '../lib.js';

import * as theaters from '../services/theater.js';
import { dataValidator } from '../services/validator.js';


const editTemplate = (theater, submitHandler) => html`
    <section id="editPage">
        <form @submit=${submitHandler} class="theater-form">
            <h1>Edit Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" .value=${theater.title}>
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${theater.date}>
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author" .value=${theater.author}>
            </div>
            <div>
                <label for="description">Theater Description:</label>
                <textarea id="description" name="description" placeholder="Description"
                    .value=${theater.description}>To Kill a Mockingbird is a 2018 play based on the 1960 novel of the same name by Harper Lee, adapted for the stage by Aaron Sorkin. It opened on Broadway at the Shubert Theatre on December 13, 2018. The play is set to transfer to London's West End at the Gielgud Theatre in March 2022.</textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" .value=${theater.imageUrl}>
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>`;

export const editView = (ctx) => {
    const theaterId = ctx.params.theaterId;
    const submitHandler = (e) => {
        e.preventDefault();
        const theaterData = Object.fromEntries(new FormData(e.currentTarget));
        if (dataValidator(theaterData)) {
            return alert('All fileds should be filled');
        };

        theaters.edit(theaterData, theaterId)
            .then(() => {
                ctx.page.redirect(`/theaters/${theaterId}`);
            })
    };

    theaters.getOne(theaterId)
        .then(theater => {
            ctx.render(editTemplate(theater, submitHandler));
        });
};