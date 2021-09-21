import mongoose from 'mongoose';
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

export default mongoose.model('users', UserSchema);