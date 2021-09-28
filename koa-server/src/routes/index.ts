import Router from 'koa-router';
import {checkToken} from '../middlewares/verifyToken';
import user from './user';
import region from './region';

const router = new Router();


router.use('/user', user.routes())
router.use('/region', checkToken, region.routes())



router.get('/', (ctx, next) => {
    ctx.body = "here is api page"; 
});

export default router;