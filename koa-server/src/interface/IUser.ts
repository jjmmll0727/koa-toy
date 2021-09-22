/**
 * here is for DTO for post http method
 */

export interface IUser {
    userId: string,
    password: string,
    name: string
}

export interface IUserForRegister {
    userId: string,
    password: string,
    name: string
}

export interface IUserForFindUser {
    userId: string
}

export interface IUserForLogin {
    userId: string,
    password: string
}