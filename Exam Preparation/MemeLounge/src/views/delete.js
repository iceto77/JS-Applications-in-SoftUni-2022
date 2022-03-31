import * as memes from '../services/memes.js';

export const deleteView = (ctx) => {
    const memeId = ctx.params.memeId;
    if (confirm(`Do you realy want to delete this car?`)) {
        memes.remove(memeId);
        ctx.page.redirect('/catalog');
    }
}