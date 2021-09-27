import Koa, { Context } from 'koa'
import User from '../models/User';
import bcrypt from 'bcryptjs';
import {register, findUserById} from '../service/userService';
import jwtConfig from '../../config/jwtKey';
import {sign, verify} from '../modules/jwt'
import {IUser, IUserForFindUser, IUserForRegister, IUserForLogin} from '../interface/IUser'
import { query, validationResults} from "koa-req-validation";
import { RouterContext } from '@koa/router';


export async function addUser(ctx : RouterContext, next: any){
    const {userId, password, name} : IUserForRegister = ctx.request.body
    const error = validationResults(ctx)
    if(error.hasErrors()){
        ctx.status = 500;
        ctx.body = {
            message: "validation error"
        };
        return;
    }
    console.log({userId, password, name})
    try{
        const result = await findUserById({userId})
        if(result){
            ctx.body = {
                exceptions: "",
                status: 400,
                error: false,
                message: "이미 회원가입한 사람입니다. ",
            };
            return;
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashPW = await bcrypt.hash(password, salt);

            const result = await register({userId, password : hashPW, name})
            ctx.body = {
                exceptions: "",
                status: 200,
                error: true,
                data: result
            };
            return;
        }
        
    }catch(err){
        throw err
    }  
}

export async function login(ctx : Context, next: any){
    try{
        const {userId, password} : IUserForLogin = ctx.request.body;
        const user = await findUserById({userId}) // user 타입을 정하지 않으면 user.password에서 오류가 발생 Property 'password' does not exist on type 'Document<any, any, unknown> & { _id: ObjectId; }'
        if(!user){
            ctx.body = {
                exceptions: "",
                status: 500,
                error: false,
                message: "no user",
              };
              return;
        }
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
            token: token
          };
          return;
        
    }catch(err){
        ctx.status = 500;
        ctx.body = "try catch err";
    }
}

