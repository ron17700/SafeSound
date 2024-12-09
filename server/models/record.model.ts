import mongoose, { Schema, Document, Model } from 'mongoose';
import {IChunk} from "./chuck.model";

export interface IRecord extends Document {
    id: string;
    startTime: Date;
    endTime: Date;
    summary: string;
    chunks: IChunk[];
}

const RecordScheme = new Schema<IRecord>(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
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
            required: true,
        },
        chunks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chunk',
            required: true,
        }],
    }
);

export const Record: Model<IRecord> = mongoose.model('Record', RecordScheme);
