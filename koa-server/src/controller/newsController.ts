import Koa, { Context } from 'koa'
import { register, findByCountry, getAll } from '../service/newsService';
import {sign, verify} from '../modules/jwt'
import { query, validationResults} from "koa-req-validation";
import { ICountryForFind, ICountryForStore } from '../interface/ICountry';
import { RouterContext } from '@koa/router';
import { scrapWeather } from '../modules/scrapWeather';
import { scrapNews } from '../modules/scrapNews';
import { ICountryForScrapNews } from '../interface/ICountry';
/**
 * 
 * @param ctx countrt
 * @param next 
 * @returns store new country
 */
export async function storeCountry(ctx: RouterContext, next: any){
    try{
        const {countryCode} : ICountryForScrapNews= ctx.request.body
        const error = validationResults(ctx);
        if(error.hasErrors()){
            ctx.status = 500;
            ctx.body = {
                message: "validation error"
            };
            return;
        }
        const result = await findByCountry({countryCode});
        if(result){
            ctx.body = {
                exceptions: "",
                status: 400,
                error: true,
                message: "이미 추가한 지역입니다.",
            };
            return;
        }
        const regions = await register({countryCode});
        const news = await scrapNews(countryCode);
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

