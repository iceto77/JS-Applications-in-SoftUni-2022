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
import { myProfileView } from './views/myProfile.js';
import { registerView } from './views/register.js';


page(authMiddleware,);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/create', createView);
page('/catalog', catalogView);
page('/memes/:memeId', detailsView);
page('/memes/:memeId/edit', editView);
page('/memes/:memeId/delete', deleteView);
page('/profile', myProfileView);

page.start();


