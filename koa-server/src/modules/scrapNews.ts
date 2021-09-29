import axios from 'axios';
import cheerio from 'cheerio';
import {apiKey} from '../../config/newsAPI';
import Newsapi from 'ts-newsapi';
const newsapi = new Newsapi(apiKey)
import {ApiNewsCountry} from '../types/types';
/**
 * 
 * @param country should be 2 letter for represent countries.
 * @returns articles
 */
export async function scrapNews(country : ApiNewsCountry){
    const topHeadlines = await newsapi.getTopHeadlines({
        country: country,
        pageSize: 20,
        page: 1,
    });
    return topHeadlines
}

// 카테고리 추가도 가능하게 하자.

