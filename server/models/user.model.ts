import mongoose, { Document, Schema, Model, model } from 'mongoose';
import validator from 'mongoose-unique-validator';
import { ICompany } from './company.model';

const UserSchema: Schema = new Schema({
    googleId: String,
    displayName: String,
    email: {
        type: String,
        unique: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },  
    isAdmin: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}).plugin(validator);

interface IUserSchema extends Document {
    googleId?: string;
    displayName?: string;
    email: string;
    isAdmin: boolean,
    confirmed: boolean;
}

export interface IUser extends IUserSchema {
    company: ICompany['_id'];
}

export interface IUserRelationships extends IUserSchema {
    company: ICompany;
}

UserSchema.statics.findWithCompany = async function(email: String) {
    return this.find({ email: email}).populate("company").exec()
  }
  
export interface IUserModel extends Model<IUser> {
    findWithCompany(id: string): Promise<IUserRelationships>;
}

export default mongoose.model<IUser, IUserModel>('User', UserSchema, 'users');