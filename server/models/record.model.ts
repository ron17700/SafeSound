import mongoose, { Schema, Document, Model } from 'mongoose';
import { Class } from './chuck.model';

export interface IRecord extends Document {
    userId: string;
    name?: string;
    image?: string;
    recordClass: Class;
    timestamps: boolean;
}

const RecordSchema = new Schema<IRecord>(
    {
        userId: {
            type: String,
            ref: 'User',
        },
        name:{
            type: String,
        },
        recordClass: {
            type: String,
            enum: Object.values(Class),
            default: Class.Natural
        },
        image: {
            type: String,
            default: 'default-files/default-record-image.png'
        },
    },
    {
        timestamps: true
    }
);

export const Record: Model<IRecord> = mongoose.model('Record', RecordSchema);
