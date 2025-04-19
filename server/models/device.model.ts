import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDevice extends Document {
    deviceToken: string;
    updatedAt: Date;
}

const DeviceSchema = new Schema<IDevice>(
    {
        deviceToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Device: Model<IDevice> = mongoose.model<IDevice>('Device', DeviceSchema);

export default Device;
