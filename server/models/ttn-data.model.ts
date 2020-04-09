import { Document, Schema, model } from 'mongoose';
import validator from 'mongoose-unique-validator';
import { ICompany } from "./company.model";

const TTNData: Schema = new Schema({
    date: Date,
    responseBody: JSON,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
});

export interface ITTNData extends Document {
    date: Date,
    responseBody: JSON
}

export interface ITTNDataRelationships extends  ITTNData {
    company: ICompany['_id'];
}

export default model<ITTNData>('TTNData', TTNData, 'ttndata');
