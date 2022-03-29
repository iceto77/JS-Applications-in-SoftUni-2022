import { page } from './lib.js';

import { authMiddleware } from './middlewares/authMid.js';
import { renderNavigation, renderContent } from './middlewares/renderMid.js';

import { createView } from './views/create.js';
import { deleteView } from './views/delete.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { myBooksView } from './views/myBooks.js';
import { registerView } from './views/register.js';


page(authMiddleware);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/create', createView);
page('/books/:bookId', detailsView);
page('/books/:bookId/edit', editView);
page('/books/:bookId/delete', deleteView);
page('/mybooks', myBooksView);

page.start();


