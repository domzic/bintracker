import mongoose, { Document, Schema, Model, model } from 'mongoose';
import validator from 'mongoose-unique-validator';

import { IUser } from './user.model';

const CompanySchema = new Schema({
    name: { type: String, unique: true },
    employees: [String]
}).plugin(validator);

interface ICompanySchema extends Document {
    name: string;
}

export interface ICompany extends ICompanySchema {
    employees: String[];
}

export default model<ICompany>('Company', CompanySchema, 'companies');
