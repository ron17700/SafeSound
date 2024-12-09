import mongoose, { Schema, Document, Model } from 'mongoose';

enum Class {
    Natural = "Natural",
    Good = "Good",
    Bad = "Bad"
}

enum Status {
    NotStarted = "not-started",
    InProgress = "in-progress",
    Completed = "completed",
    Failed = "failed",
}

export interface IChunkTimeStamp extends Document {
    id: string;
    chunkId: string;
    startTime: Date;
    endTime: Date
    text: string
}

export interface IChunk extends Document {
    id: string;
    startTime: Date;
    endTime: Date;
    status: Status;
    class: Class;
    chunkTimeStamp: IChunkTimeStamp[];
}

const ChunkScheme = new Schema<IChunk>(
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
        status: {
            type: String,
            required: true,
        },
        class: {
            type: String,
            required: true,
        },
    }
);

export const Chunk: Model<IChunk> = mongoose.model('Chunk', ChunkScheme);
