import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import api from './routes'

const app = new Koa();
const router = new Router();
const port: number = 4000;

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });


const MONGO_URI = process.env.MONGO_URI;
​mongoose.connect("mongodb://localhost:27017/koa"); // koa -> database name
const db = mongoose.connection;

db.on('error', function(){
    console.log('Connection Failed!');
});
db.once('open', function() {
    console.log('Connected to koa db');
});


app.use(bodyparser()); // bodyParser는 라우터 코드보다 상단에 있어야 합니다.

router.get('/', async (ctx) => {
    ctx.body = 'koa-toy-side-project is starting~';
});

app.use(router.routes());
router.use('/api', api.routes())


app.listen(port, ()=> {
	console.log(`#########################################
        🛡️  Server listening on port: ${port} 🛡️
        ##########################################`);
});