import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import api from './api'

const app = new Koa();
const router = new Router();
const port: number = 4000;

app.use(bodyparser()); // bodyParser는 라우터 코드보다 상단에 있어야 합니다.

router.get('/', async (ctx) => {
    ctx.body = 'koa-toy-side-project is starting~';
});

router.use('/api', api.routes())

app.use(router.routes());

app.listen(port, ()=> {
	console.log(`Koa server is listening on port ${port}`);
});