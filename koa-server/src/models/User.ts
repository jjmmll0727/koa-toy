import mongoose from 'mongoose';
import { Document } from 'mongoose';
import {IUser, IUserForFindUser, IUserForRegister} from '../interface/IUser';
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    userId : {

        type: String,
        required: true,
        unique: true

    },
    password : {

        type: String,
        required: true,        
    },
    name : {

        type: String,
        required: true

    }
});

export default mongoose.model<IUser & mongoose.Document>('users', UserSchema);