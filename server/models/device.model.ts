import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDevice extends Document {
    userId: string;
    deviceToken: string;
}

const DeviceSchema = new Schema<IDevice>(
    {
        userId: {
            type: String,
            ref: 'User',
        },
        deviceToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Device: Model<IDevice> = mongoose.models.User || mongoose.model<IDevice>('Device', DeviceSchema);

export default Device;
