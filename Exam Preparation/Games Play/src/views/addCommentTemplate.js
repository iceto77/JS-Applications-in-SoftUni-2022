import { html } from '../lib.js';

export const addCommentTemplate = (submitHandler) => html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form  @submit=${submitHandler} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>`;