import mongoose, { Document, Schema, Model, model } from 'mongoose';

import { IUser } from './User';

const CompanySchema = new Schema({
    name: String,
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }]
});

interface ICompanySchema extends Document {
    name: string;
}

export interface ICompany extends ICompanySchema {
    employees: [IUser['_id']];
}

export interface ICompanyRelationships extends ICompanySchema {
    employees: [IUser];
}

export default model<ICompany>('Company', CompanySchema, 'companies');