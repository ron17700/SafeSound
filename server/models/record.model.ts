import mongoose, { Schema, Document, Model } from 'mongoose';
import { Class } from './chunk.model';

export interface IRecord extends Document {
    userId: string;
    name?: string;
    image?: string;
    recordClass: Class;
    public?: boolean;
    createdAt: Date;
    location?: {
        type: string;
        coordinates: [number, number];
    };
    numberOfComments: number;
}

export type RecordObj ={
    _id: string;
    userId: string;
    name?: string;
    image?: string;
    recordClass: Class;
    public?: boolean;
    createdAt: Date;
    location?: {
        type: string;
        coordinates: [number, number];
    };
    latitude?: number;
    longitude?: number;
    numberOfComments: number;
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
            default: 'default-files/default-record-image.jpg'
        },
        public: {
            type: Boolean,
            default: false
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                required: false
            }
        },
        numberOfComments: {
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true
    }
);

export const Record: Model<IRecord> = mongoose.model('Record', RecordSchema);
