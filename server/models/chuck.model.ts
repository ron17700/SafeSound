import mongoose, { Schema, Document, Model } from 'mongoose';

export enum Class {
    Natural = "Natural",
    Good = "Good",
    Bad = "Bad"
}

export enum Status {
    NotStarted = "not-started",
    InProgress = "in-progress",
    Completed = "completed",
    Failed = "failed",
}

export interface IChunk {
    id: string;
    recordId: string;
    startTime: Date;
    endTime: Date;
    status: Status;
    class?: Class;
    audioFilePath: string;
}

export interface IChunkScheme extends Document {
    recordId: string;
    chunkId: string;
    startTime: Date;
    endTime: Date;
    status: Status;
    class: Class;
    summary: string;
    audioFilePath: string;
}

const ChunkScheme = new Schema<IChunkScheme>(
    {
        recordId: {
            type: String,
            ref: 'Record',
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
        },
        class: {
            type: String,
        },
        summary: {
            type: String,
        },
        audioFilePath: {
            type: String,
            required: true
        }
    }
);


export const Chunk: Model<IChunkScheme> = mongoose.model('Chunk', ChunkScheme);
