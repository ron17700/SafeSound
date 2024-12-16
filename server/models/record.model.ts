import mongoose, { Schema, Document, Model } from 'mongoose';
import {IChunkScheme} from "./chuck.model";
import { v4 as uuid } from 'uuid';

export interface IRecord extends Document {
    recordId: string;
    userId: string;
    startTime?: Date;
    endTime?: Date;
    summary?: string;
    chunks?: IChunkScheme[];
}

const RecordSchema = new Schema<IRecord>(
    {
        recordId: {
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
        chunks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chunk',
        }],
    }
);

RecordSchema.pre('save', function (next) {
    if (!this.recordId) {
        this.recordId = uuid();
    }
    next();
});

export const Record: Model<IRecord> = mongoose.model('Record', RecordSchema);
