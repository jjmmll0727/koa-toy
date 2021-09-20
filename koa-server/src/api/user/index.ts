import Router from 'koa-router';
const api = new Router();
import userController from '../../controller/userController';

api.post('/register/local', userController);


module.exports = api;