import Country from '../models/Country';
import { ICountryForStore, ICountryForFind } from '../interface/ICountry';

export async function register(data: ICountryForStore){
    const country = new Country(data);
    return country.save();
}

export async function findByCountry(data: ICountryForFind){
    const {country} = data
    return Country.findOne({country})
}


// todo: 
export async function getAll(){
    const regionList = await Country.find();
    console.log(regionList);
}