import { page } from './lib.js';

import { authMiddleware } from './middlewares/authMid.js';
import { renderNavigation, renderContent } from './middlewares/renderMid.js';

import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { deleteView } from './views/delete.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { myListingsView } from './views/myListings.js';
import { registerView } from './views/register.js';
import { searchView } from './views/search.js';



page(authMiddleware);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/catalog', catalogView);
page('/create', createView);
page('/cars/:carId', detailsView);
page('/cars/:carId/edit', editView);
page('/cars/:carId/delete', deleteView);
page('/mylistings', myListingsView);
page('/search', searchView);

page.start();


