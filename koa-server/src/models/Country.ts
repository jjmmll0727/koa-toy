import mongoose from 'mongoose';
import { Document } from 'mongoose';
import {ICountry} from '../interface/ICountry';
const Schema = mongoose.Schema;

const CountrySchema = new Schema({

    country : {

        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model<ICountry & mongoose.Document>('Countries', CountrySchema);