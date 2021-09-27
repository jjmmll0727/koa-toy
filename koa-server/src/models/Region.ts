import mongoose from 'mongoose';
import { Document } from 'mongoose';
import {IRegion} from '../interface/IRegion';
const Schema = mongoose.Schema;

const RegionSchema = new Schema({

    province : {

        type: String,
        required: true
    },
    city : {
        type: String,
        required: true,  
        unique: true      
    }
});

export default mongoose.model<IRegion & mongoose.Document>('regions', RegionSchema);