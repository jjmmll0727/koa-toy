import Router from 'koa-router';
const api = new Router();
import {addUser, login} from '../controller/userController';

api.post('/register', addUser);
api.post('/login', login);

api.get('/', (ctx, next) => {
    ctx.body = "here is api page"; 
});

export default api;