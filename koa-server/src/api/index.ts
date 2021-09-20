import Router from 'koa-router';
const api = new Router();

api.get('/', (ctx, next) => {
    ctx.body = "here is api page"; 
});

export default api;