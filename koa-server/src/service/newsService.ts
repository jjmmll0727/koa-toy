import Country from '../models/Country';
import { ICountryForStore, ICountryForFind } from '../interface/ICountry';

export async function register(data: ICountryForStore){
    const countryCode = new Country(data);
    return countryCode.save();
}

export async function findByCountry(data: ICountryForFind){
    const {countryCode} = data
    return Country.findOne({countryCode})
}


// todo: 
export async function getAll(){
    const regionList = await Country.find();
    console.log(regionList);
}