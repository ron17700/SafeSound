import mongoose, { Schema, Document, Model } from 'mongoose';
import {IMessage} from "./message.model";

export enum Class {
    Natural = "Natural",
    Good = "Good",
    Bad = "Bad",
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
    chunkClass?: Class;
    audioFilePath: string;
}

export interface IChunkScheme extends Document {
    recordId: string;
    startTime: Date;
    endTime: Date;
    status: Status;
    chunkClass: Class;
    summary: string;
    audioFilePath: string;
    messages: Array<IMessage>;
    numberOfComments: number;
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
        chunkClass: {
            type: String,
        },
        summary: {
            type: String,
        },
        audioFilePath: {
            type: String,
            required: true
        },
        numberOfComments: {
            type: Number,
            default: 0
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }],
    }
);


export const Chunk: Model<IChunkScheme> = mongoose.model('Chunk', ChunkScheme);
