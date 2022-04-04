import { page } from './lib.js';

import { authMiddleware } from './middlewares/authMid.js';
import { renderNavigation, renderContent } from './middlewares/renderMid.js';

import { createView } from './views/create.js';
import { dashboardView } from './views/dashboard.js';
import { deleteView } from './views/delete.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { registerView } from './views/register.js';

page(authMiddleware);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/pets/:petId', detailsView);
page('/pets/:petId/edit', editView);
page('/pets/:petId/delete', deleteView);

page.start();


