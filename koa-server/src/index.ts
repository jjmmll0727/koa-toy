import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();
const port: number = 4000;

app.use(bodyparser());

router.get('/', async (ctx) => {
    ctx.body = 'koa-toy-side-project is starting~';
});

app.use(router.routes());

app.listen(port, ()=> {
	console.log(`Koa server is listening on port ${port}`);
});