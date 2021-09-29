import Koa, { Context } from 'koa'
import { register, findByCountry, getAll } from '../service/newsService';
import {sign, verify} from '../modules/jwt'
import { query, validationResults} from "koa-req-validation";
import { ICountryForStore } from '../interface/ICountry';
import { RouterContext } from '@koa/router';
import { scrapWeather } from '../modules/scrapWeather';
import { scrapNews } from '../modules/scrapNews';
/**
 * 
 * @param ctx province & city
 * @param next 
 * @returns store new region
 */
export async function storeCountry(ctx: RouterContext, next: any){
    try{
        //const {country} : ICountryForStore = ctx.request.body
        const {country} = ctx.request.body
        // country 는 일반적으로 사람들이 생각하는 나라이름 -> 실제 디비에 저장하는 이름
        // country_code 는 2 letter country name
        // 매핑이 필요해
        
        const error = validationResults(ctx);
        if(error.hasErrors()){
            ctx.status = 500;
            ctx.body = {
                message: "validation error"
            };
            return;
        }
        const result = await findByCountry({country});
        if(result){
            ctx.body = {
                exceptions: "",
                status: 400,
                error: true,
                message: "이미 추가한 지역입니다.",
            };
            return;
        }
        const regions = await register({country});
        //const weather = await scrapWeather(city);
        const news = await scrapNews(country);
        console.log(news)
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

