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
    },
    phone: Number,
    position: String
}).plugin(validator);

interface IUserSchema extends Document {
    googleId?: string;
    displayName?: string;
    email: string;
    isAdmin: boolean;
    confirmed: boolean;
    phone?: number;
    position?: string;
}

export interface IUser extends IUserSchema {
    company: ICompany['_id'];
}

export interface IUserRelationships extends IUserSchema {
    company: ICompany;
}

UserSchema.statics.findWithCompany = async function (email: string) {
    return this.find({ email }).populate('company').exec();
};

UserSchema.statics.existsByEmail = async function (email: string) {
    const user = await this.findOne({ email });
    return !!user;
};

export interface IUserModel extends Model<IUser> {
    findWithCompany(id: string): Promise<IUserRelationships>;
    existsByEmail(email: string): Promise<boolean>;
}

export default mongoose.model<IUser, IUserModel>('User', UserSchema, 'users');
