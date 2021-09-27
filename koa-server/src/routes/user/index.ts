import express from 'express';
import Router from 'koa-router';
import {addUser, login} from '../../controller/userController';

const router = new Router();

router.post('/addUser', addUser);
router.post('/login', login);


export default router;