import { Document, Schema, model, Model } from 'mongoose';
import * as mongoose from 'mongoose';

const ContainerSchema: Schema = new Schema({
    latitude: Number,
    longitude: Number,
    ttnDeviceId: String,
    level: Number,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    timesServiced: Number,
    height: Number
});

export interface IContainer extends Document {
    latitude: number;
    longitude: number;
    ttnDeviceId: string;
    level: number;
    timesServiced: number;
    height?: number;
}

ContainerSchema.statics.companyDeviceExists = async function (ttnDeviceId: string, companyId: mongoose.Types.ObjectId) {
    const container = await this.findOne({ ttnDeviceId, company: companyId });
    return !!container;
};

export interface IContainerModel extends Model<IContainer> {
    companyDeviceExists(ttnDeviceId: string, companyId: mongoose.Types.ObjectId): Promise<boolean>;
}

export default model<IContainer, IContainerModel>('Container', ContainerSchema, 'containers');
