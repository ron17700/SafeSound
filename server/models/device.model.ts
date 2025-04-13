import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDevice extends Document {
    userId: string;
    deviceToken: string;
    lastActiveDate: Date;
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
        lastActiveDate: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);

const Device: Model<IDevice> = mongoose.models.User || mongoose.model<IDevice>('Device', DeviceSchema);

export default Device;
