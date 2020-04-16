import { Document, Schema, model } from 'mongoose';
import validator from 'mongoose-unique-validator';
import { ICompany } from './company.model';

const Container: Schema = new Schema({
    latitude: Number,
    longitude: Number,
    ttnDeviceId: {
        type: String,
        unique: true
    },
    level: Number,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    timesServiced: Number,
    height: Number
}).plugin(validator);

export interface IContainer extends Document {
    latitude: number;
    longitude: number;
    ttnDeviceId: string;
    level: number;
    timesServiced: number;
    height?: number;
}

export interface IContainerRelationships extends IContainer {
    company: ICompany['_id'];
}

export default model<IContainer>('Container', Container, 'containers');
