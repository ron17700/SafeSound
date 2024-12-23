import mongoose, { Schema, Document, Model } from 'mongoose';
import { Class } from './chuck.model';

export interface IRecord extends Document {
    userId: string;
    name?: string;
    image?: string;
    class: Class;
}

const RecordSchema = new Schema<IRecord>(
    {
        userId: {
            type: String,
            ref: 'User',
        },
        class: {
            type: String,
            enum: Object.values(Class),
            default: Class.Natural
        },
        image: {
            type: String,
        }
    }
);

export const Record: Model<IRecord> = mongoose.model('Record', RecordSchema);
