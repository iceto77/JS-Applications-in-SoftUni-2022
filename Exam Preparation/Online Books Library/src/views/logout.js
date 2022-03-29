import * as users from '../services/users.js';

export const logoutView = (ctx) => {
    users.logout()
        .then(() => {
            ctx.page.redirect('/');
        });
}