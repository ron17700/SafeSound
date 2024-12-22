import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRecord extends Document {
    userId: string;
    startTime?: Date;
    endTime?: Date;
    summary?: string;
    name?: string;
    image?: string;
}

const RecordSchema = new Schema<IRecord>(
    {
        userId: {
            type: String,
            ref: 'User',
        },
        startTime: {
            type: Date,
            default: Date.now
        },
        endTime: {
            type: Date,
            default: Date.now
        },
        summary: {
            type: String,
        },
        image: {
            type: String,
        }
    }
);

export const Record: Model<IRecord> = mongoose.model('Record', RecordSchema);
