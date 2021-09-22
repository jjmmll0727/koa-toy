import Koa, { Context } from 'koa'
import User from '../models/User';
import bcrypt from 'bcryptjs';
import {register, findUserById} from '../service/userService';
import jwtConfig from '../../config/jwtKey';
import {sign, verify} from '../../modules/jwt'

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
            const salt = await bcrypt.genSalt(10);
            const hashPW = await bcrypt.hash(password, salt);

            const result = await register(userId, hashPW, name)
            ctx.status = 200
            ctx.body = {result : result}
        }
        
    }catch(err){
        throw err
    }  
}

export async function login(ctx : Context, next: any){
    try{
        const {userId, password} = ctx.request.body;
        const user : any = await findUserById(userId) // user 타입을 정하지 않으면 user.password에서 오류가 발생 Property 'password' does not exist on type 'Document<any, any, unknown> & { _id: ObjectId; }'
        const result = await bcrypt.compare(password, user.password);
        if(!result){
            ctx.body = {
                exceptions: "",
                status: 500,
                error: false,
                message: "wrong pw",
              };
              return;
        }
        const token = await sign(result)
        ctx.body = {
            exceptions: "",
            status: 200,
            error: true,
            message: "success to loign",
            body: token
          };
          return;
        
    }catch(err){
        ctx.status = 500;
        ctx.body = "try catch err";
    }
}

