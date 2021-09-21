import Koa, { Context } from 'koa'
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {register, findUserById} from '../service/userService';

export async function addUser(ctx : Context, next: any){
    const {userId, password, name} = ctx.request.body
    try{
        const result = await findUserById(userId)
        if(result){
            ctx.status = 400;
            ctx.body = {
                message: "이미 회원가입 한 유저입니다. "
            };
        }else{
            const result = await register(userId, password, name)
            ctx.body = {result : result}
        }
        
    }catch(err){
        throw err
    }  
}

