import User from '../models/User';

export default class UserService {

    userModel;
    
    constructor(userModel) {
        this.userModel = userModel;
    }
    
    async addUsers(users) {
        
    }

    async getUserByEmail(email) {
        return await this.userModel.findOne({ email: email });
    }
    
}