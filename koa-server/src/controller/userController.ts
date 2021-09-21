import Koa, { Context } from 'koa'
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {register} from '../service/userService';

export async function addUser(ctx : Context, next: any){
    const {userId, password, name} = ctx.request.body
    try{
        const result = await register(userId, password, name)
        ctx.body = {result : result}
    }catch(err){
        ctx.throw(400, {
            statuscode : 401,
            errmsg : "fail to sign up"
        })
    }  
}

