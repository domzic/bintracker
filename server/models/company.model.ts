import { Document, Schema, model } from 'mongoose';
import validator from 'mongoose-unique-validator';

const CompanySchema = new Schema({
    name: { type: String, unique: true },
    employees: [String]

}).plugin(validator);

export interface ICompany extends Document {
    name: string;
    employees: string[];
}

export default model<ICompany>('Company', CompanySchema, 'companies');
