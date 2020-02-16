import mongoose, { Document, Schema, Model, model } from 'mongoose';

import { ICompany } from './Company';

const UserSchema: Schema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'companies',
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
});

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

UserSchema.statics.findMyCompany = async function(id: number) {
    return this.findById(id).populate('company').exec()
}

export default mongoose.model<IUser>('User', UserSchema, 'users');