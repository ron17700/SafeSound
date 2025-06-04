import {IRecord, Record, RecordObj} from '../models/record.model';
import { Chunk, Class } from '../models/chunk.model';
import * as fs from "node:fs";
import { promisify } from 'util';
import User from "../models/user.model";

const unlinkAsync = promisify(fs.unlink);

export const RecordService = {
    async getAllRecords(userId: string) {
        return Record.find({ userId }).populate('userId', '-password -refreshToken');
    },

    async getRecord(userId: string, id: string) {
        return Record.findOne({userId, _id: id}).populate('userId', '-password -refreshToken');
    },

    async getRecordById(id: string) {
        return Record.findById(id);
    },

    async addRecord(recordData: Partial<IRecord> & { file: string, isPublic: boolean, longitude: number, latitude: number }) {
        const { userId, name, file, isPublic, longitude, latitude } = recordData;

        if (!userId || !name) {
            throw new Error('Missing required fields');
        }

        const newRecord = new Record({
            userId,
            name,
            image: file,
            public: isPublic,
            location: {
                type: 'Point',
                coordinates: [latitude, longitude]
            }
        });

        try {
            const savedRecord = await newRecord.save();
            return Record.findById(savedRecord._id).populate('userId', '-password -refreshToken');
        } catch (error) {
            console.error('Error adding record', error);
            throw error;
        }
    },

    async updateRecord(id: string, recordData: Partial<IRecord> & { file: string, isPublic: boolean,}) {
        const record = await Record.findOne({userId: recordData.userId, _id: id});

        if (!record) {
            throw new Error('Record not found');
        }

        Object.assign(record, {
            name: recordData.name ? recordData.name : record.name,
            public: recordData.isPublic ? recordData.isPublic : record.public,
            image: recordData.file ? recordData.file : record.image,
        });

        if (recordData.isPublic === false) {
            await User.updateMany(
                { favRecords: id },
                { $pull: { favRecords: id } }
            );
        }

        try {
            return await record.save();
        } catch (error) {
            console.error('Error updating record', error);
            throw error;
        }
    },

    async deleteRecord(id: string, userId: string): Promise<IRecord | null> {
        try {
            const record = await Record.findById(id);
            if (!record) {
                throw new Error('Record not found');
            }

            if (record.userId !== userId) {
                throw new Error('Record does not belong to the user');
            }

            // Find and delete all chunks associated with the record
            const chunks = await Chunk.find({ recordId: id });
            for (const chunk of chunks) {
                if (chunk.audioFilePath) {
                    try {
                        // Check if the chunk audio file exists before attempting to delete it
                        await unlinkAsync(chunk.audioFilePath);
                    } catch (error) {
                        console.error(`Error deleting chunk file: ${chunk.audioFilePath}`);
                    }
                }
                await Chunk.findByIdAndDelete(chunk.id);
            }

            // Delete the record image if it exists and isn't the default image
            if (record.image && record.image !== 'default-files/default-record-image.jpg') {
                try {
                    await unlinkAsync(record.image);
                } catch (error) {                   
                    console.error(`Error deleting record image: ${record.image}`);
                }
            }

            await User.updateMany(
                { favRecords: id },
                { $pull: { favRecords: id } }
            );

            return await Record.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting record', error);
            throw error;
        }
    },

    async defineRecordClass(id: string) {
        const chunks = await Chunk.find({recordId: id});

        let overallTone;
        let goodChunksCount = 0;
        let badChunksCount = 0;
        let neutralChunksCount = 0;

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            switch (chunk.chunkClass){
                case Class.Good:
                    goodChunksCount++;
                    break;
                case Class.Bad:
                    badChunksCount++;
                    break;
                case Class.Natural:
                    neutralChunksCount++;
                    break;
            }
        }

        if (neutralChunksCount > badChunksCount && neutralChunksCount > goodChunksCount) {
            overallTone = Class.Natural;
        } else if (goodChunksCount > badChunksCount) {
            overallTone = Class.Good;
        } else {
            overallTone = Class.Bad;
        }

        const record = await Record.findById(id);

        if (!record) {
            throw new Error('Record not found');
        }

        record.recordClass = overallTone;
        await record.save();
    },

    async getAllPublicRecords(userId: string) {
        const records = await Record.find({ public: true, userId: { $ne: userId } }).populate('userId', '-password -refreshToken');

        const recordObjs: Array<RecordObj> = [];
        records.forEach((record) => {
            recordObjs.push({
                _id: record.id,
                userId: record.userId,
                name: record.name,
                image: record.image,
                recordClass: record.recordClass,
                public: record.public,
                createdAt: record.createdAt,
                location: record.location,
                numberOfComments: record.numberOfComments,
                latitude: record.location ? record.location.coordinates[0] : 0,
                longitude: record.location ? record.location.coordinates[1] : 0,
            })
       });

        return recordObjs;
    }
};
