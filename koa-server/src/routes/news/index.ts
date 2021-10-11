import express from 'express';
import Router from 'koa-router';
import { storeCountry, getAllCountry, getMyNews } from '../../controller/newsController';

const router = new Router();

router.post('/storeCountry', storeCountry);
router.get('/getAllCountry', getAllCountry);
router.post('/getMyNews', getMyNews);

export default router;