import * as albums from '../services/album.js';

export const deleteView = (ctx) => {
    const albumId = ctx.params.albumId;
    if (confirm(`Do you realy want to delete this car?`)) {
        albums.remove(albumId);
        ctx.page.redirect('/catalog');
    }
}