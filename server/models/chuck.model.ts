import mongoose, { Schema, Document, Model } from 'mongoose';
import {v4 as uuid} from "uuid";

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

export interface IChunkTimeStamp extends Document {
    startTime: Date;
    endTime: Date;
    text: string;
    class: Class;
}

export interface IChunk {
    recordId: string;
    chunkId: string;
    startTime: Date;
    endTime: Date;
    status: Status;
    class?: Class;
    chunkTimeStamp?: IChunkTimeStamp[];
    audioFilePath: string;
}

export interface IChunkScheme extends Document {
    recordId: string;
    chunkId: string;
    startTime: Date;
    endTime: Date;
    status: Status;
    class: Class;
    chunkTimeStamp?: IChunkTimeStamp[];
    audioFilePath: string;
}

const ChunkScheme = new Schema<IChunkScheme>(
    {
        recordId: {
            type: String,
            required: true
        },
        chunkId: {
            type: String,
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
        },
        class: {
            type: String,
        },
        chunkTimeStamp: [{
            startTime: Date,
            endTime: Date,
            text: String,
            class: String
        }],
        audioFilePath: {
            type: String,
            required: true
        }
    }
);


ChunkScheme.pre('save', function (next) {
    if (!this.chunkId) {
        this.chunkId = uuid();
    }
    next();
});

export const Chunk: Model<IChunkScheme> = mongoose.model('Chunk', ChunkScheme);
