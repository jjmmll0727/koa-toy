import User from '../models/User';

export const register =  async(userId: String, password: String, name: String) => {
    User.findOne({userId : userId}).exec().then((user) => {
        if(user){
            return null
        }else{
            return User.create({
                userId,
                password,
                name
            })
        }
        
    })
}


