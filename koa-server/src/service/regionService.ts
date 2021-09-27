import Region from '../models/Region';
import { IRegionForStore, IRegionForFind } from '../interface/IRegion';

export async function register(data: IRegionForStore){
    const regions = new Region(data);
    return regions.save();
}

export async function findByProvince(data: IRegionForFind){
    const {city} = data
    return Region.findOne({city})
}


// todo: 
export async function getAll(){
    const regionList = await Region.find();
    console.log(regionList);
}