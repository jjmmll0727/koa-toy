export interface ICountry{
    countryCode : string
}

export interface ICountryForStore{ 
    countryCode : string
}

export interface ICountryForFind{
    countryCode : string
}

import { ApiNewsCountry } from '../types/types';
export interface ICountryForScrapNews{
    countryCode : ApiNewsCountry
}