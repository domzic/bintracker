import { Document, Schema, model } from 'mongoose';
import validator from 'mongoose-unique-validator';
import { IUser } from './user.model';

const CompanySchema = new Schema({
    name: { type: String, unique: true },
    employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    ttnAppName: { type: String, unique: true },
    lastUpdate: Date

}).plugin(validator);

export interface ICompany extends Document {
    name: string;
    employees: IUser[];
    ttnAppName: string;
    lastUpdate: Date;
}

export default model<ICompany>('Company', CompanySchema, 'companies');
