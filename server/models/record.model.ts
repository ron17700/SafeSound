import mongoose, { Schema, Document, Model } from 'mongoose';
import {IChunk} from "./chuck.model";

export interface IRecord extends Document {
    id: string;
    startTime: Date;
    endTime: Date;
    summary: string;
    chunks: IChunk[];
}

const RecordSchema = new Schema<IRecord>(
    {
        _id: {
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

interface RecordModel extends Model<IRecord> {
    findByIdAndRemove(id: string): Promise<IRecord | null>;
}

export const Record = mongoose.model<IRecord, RecordModel>('Record', RecordSchema);
