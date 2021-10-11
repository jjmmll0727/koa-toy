import Country from '../models/Country';
import { ICountryForStore, ICountryForFind, ICountryForScrapNews } from '../interface/ICountry';
import { scrapNews } from '../modules/scrapNews';
import { ApiNewsCountry } from '../types/types';

export async function register(data: ICountryForStore){
    const countryCode = new Country(data);
    return countryCode.save();
}

export async function findByCountry(data: ICountryForFind){
    const {countryCode} = data
    return Country.findOne({countryCode})
}

export async function getAll(){
    return Country.find()
}