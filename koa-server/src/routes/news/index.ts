import express from 'express';
import Router from 'koa-router';
import { storeCountry } from '../../controller/newsController';

const router = new Router();

router.post('/storeCountry', storeCountry);

export default router;