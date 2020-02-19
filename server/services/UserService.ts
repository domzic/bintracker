import User, { IUserRelationships , IUser } from '../models/User';
import { Error }  from 'mongoose';
import { doesNotMatch } from 'assert';

export class UserService {
    
    async create(users: IUser[] | IUser) {
        try {
            return await User.insertMany(users);
        } catch (error) {
            if (error instanceof Error.ValidationError) {
                throw new Error('User with this username already exists');
            }
            throw new Error(error.message);
        }
    }

    async update(user: IUserRelationships) {
        try {
            return await user.save();
        } catch (error) {
            throw new Error(error.message);
        }

    }
}