import User from '../models/User';
import { IUserForRegister, IUserForFindUser } from '../interface/IUser';

export async function register(data : IUserForRegister){    

    // return User.create({
    //     data
    // }) 이렇게 하면 안되는 이유가...?

    const newUser = new User(data); 
    return newUser.save();
}

export async function findUserById(data : IUserForFindUser){
    const {userId} = data
    return User.findOne({userId});
}


