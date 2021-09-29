import Router from 'koa-router';
import {checkToken} from '../middlewares/verifyToken';
import user from './user';
import news from './news';

const router = new Router();


router.use('/user', user.routes())
router.use('/news', checkToken, news.routes())



router.get('/', (ctx, next) => {
    ctx.body = "here is api page"; 
});

export default router;