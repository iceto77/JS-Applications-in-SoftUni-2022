import { render } from '../lib.js';
import { navigationView } from '../views/navigation.js';

const navigationParent = document.querySelector('.header-navigation');
const contentParent = document.getElementById('main-content');

export const renderNavigation = (ctx, next) => {
    render(navigationView(ctx), navigationParent);
    next();
}

export const renderContent = (ctx, next) => {
    ctx.render = (templateResult) => render(templateResult, contentParent);
    next();
}