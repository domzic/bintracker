import { Document, Schema, model } from 'mongoose';

const Stat: Schema = new Schema({
    key: String,
    value: String,
    action: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    date: Date
});

export interface IStat extends Document {
    key: StatType;
    value?: string;
    date: Date;
    action?: string;
}

export default model<IStat>('Stat', Stat, 'stats');

export enum StatType {
    Action = 'action',
    servicedContainersCount = 'servicedCount',
    notRegisteredDevices = 'notRegisteredDevices'
}

export enum Action {
    Remove = 'remove',
    Add = 'add',
    StatusChange = 'statusChange',
    Serviced = 'serviced'
}
