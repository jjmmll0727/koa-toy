import Koa, { Context } from 'koa'
import { register, findByProvince, getAll } from '../service/regionService';
import {sign, verify} from '../modules/jwt'
import { query, validationResults} from "koa-req-validation";
import { IRegionForStore } from '../interface/IRegion';
import { RouterContext } from '@koa/router';

/**
 * 
 * @param ctx province & city
 * @param next 
 * @returns store new region
 */
export async function storeRegion(ctx: RouterContext, next: any){
    try{
        const {province, city} : IRegionForStore = ctx.request.body
        const error = validationResults(ctx);
        if(error.hasErrors()){
            ctx.status = 500;
            ctx.body = {
                message: "validation error"
            };
            return;
        }
        const result = await findByProvince({city});
        if(result){
            ctx.body = {
                exceptions: "",
                status: 400,
                error: true,
                message: "이미 추가한 지역입니다.",
            };
            return;
        }
        const regions = await register({province, city});
        ctx.body = {
            exceptions: "",
            status: 200,
            error: false,
            message: "지역을 새로 추가하였습니다.",
        };
        return;

        
    }catch(err){
        console.log(err);
        throw err;
    }
}