import { Document, Schema, model, Model } from 'mongoose';
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

CompanySchema.statics.existsByName = async function (name: string) {
    const company = await this.findOne({ name });
    return !!company;
};

CompanySchema.statics.existsByTTNName = async function (ttnAppName: string) {
    const company = await this.findOne({ ttnAppName });
    return !!company;
};

export interface ICompanyModel extends Model<ICompany> {
    existsByName(name: string): Promise<boolean>;
    existsByTTNName(ttnAppName: string): Promise<boolean>;
}

export default model<ICompany, ICompanyModel>('Company', CompanySchema, 'companies');
