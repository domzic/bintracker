import { Document, Schema, model } from 'mongoose';
import { IUser} from "./user.model";
import validator from 'mongoose-unique-validator';

const CompanySchema = new Schema({
    name: { type: String, unique: true },
    employees: [{type: Schema.Types.ObjectId, red: 'User' }]

}).plugin(validator);

export interface ICompany extends Document {
    name: string;
    employees: IUser[];
}

export default model<ICompany>('Company', CompanySchema, 'companies');
