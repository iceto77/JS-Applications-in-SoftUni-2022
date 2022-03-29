import * as books from '../services/books.js';

export const deleteView = (ctx) => {
    const bookId = ctx.params.bookId;
    if (confirm(`Do you realy want to delete this book?`)) {
        books.remove(bookId);
        ctx.page.redirect('/');
    }
}