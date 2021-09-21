import User from '../models/User';

export const register =  async(userId: String, password: String, name: String) => {    
    return User.create({
        userId,
        password,
        name
    })
}

export const findUserById = async(userId: String) => {
    return User.findOne({userId : userId});
}
