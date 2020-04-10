import { Document, Schema, model } from 'mongoose';

const Stat: Schema = new Schema({
    key: String,
    value: Number,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    devices: [String]
});

export interface IStat extends Document {
    key: StatType;
    value?: number;
    devices?: string[];
}

export default model<IStat>('Stat', Stat, 'stats');

export enum StatType {
    servicedContainersCount = 'servicedCount',
    notRegisteredDevices = 'notRegisteredDevices'
}
