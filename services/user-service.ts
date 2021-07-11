import {IUserService} from "./interfaces";

class UserService implements IUserService {

    private static instance: UserService;

    private _userId: number;

    private constructor() {}

    public static getInstance(): UserService {
        if(!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    public getUserId(): number {
        return this._userId;
    }

    public setUserId(userId: number) {
        this._userId = userId;
    }

}

module.exports = UserService;