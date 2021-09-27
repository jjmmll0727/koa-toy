import express from 'express';
import Router from 'koa-router';
import { storeRegion } from '../../controller/regionController';

const router = new Router();

router.post('/storeRegion', storeRegion);

export default router;