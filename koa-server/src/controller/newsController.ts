import Koa, { Context } from 'koa'
import { register, findByCountry, getAll } from '../service/newsService';
import {sign, verify} from '../modules/jwt'
import { query, validationResults} from "koa-req-validation";
import { ICountryForFind, ICountryForStore } from '../interface/ICountry';
import Router, { RouterContext } from '@koa/router';
import { scrapWeather } from '../modules/scrapWeather';
import { scrapNews } from '../modules/scrapNews';
import { ICountryForScrapNews } from '../interface/ICountry';
import { ApiNewsCategory } from 'ts-newsapi/lib/types';
import { ApiNewsCountry } from '../types/types';
import NewsAPI from 'ts-newsapi';
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


export async function getAllCountry(ctx: RouterContext, next: any){
    try{
        const countryList = await getAll();
        if(!countryList){
            ctx.body = {
                exceptions: "",
                status: 400,
                error: true,
                message: "추가한 나라가 없습니다.",
            }; 
            return;
        }
        ctx.body = {
            exceptions: "",
            status: 200,
            error: false,
            result: countryList,
        }; 
        return;

    }catch(err){
        console.log(err);
        throw err;
    }
}


export async function getMyNews(ctx: RouterContext, next: any){
    try{
        const {countryCode}: ICountryForScrapNews = ctx.request.body
        const error = validationResults(ctx);
        if(error.hasErrors()){
            ctx.status = 500;
            ctx.body = {
                message: "validation error"
            };
            return;
        }
        const result = await scrapNews(countryCode);
        if(!result){
            ctx.body = {
                exceptions: "",
                status: 400,
                error: true,
                message: "보여줄 뉴스가 없습니다.",
            }; 
            return;  
        };
        const news: { title: string; description: string | null; url: string; }[] = []
        result.articles.filter(r => {
            news.push({
                'title' : r.title,
                'description' : r.description, 
                'url' : r.url
                })
            
        })
        ctx.body = {
            exceptions: "",
            status: 200,
            error: false,
            result: news
        }; 

    }catch(err){
        console.log(err);
        throw err;
    }
}