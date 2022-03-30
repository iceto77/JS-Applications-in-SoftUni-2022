import * as util from '../services/util.js';

export const authMiddleware = (ctx, next) => {
    ctx.user = util.getUser();
    next();
}