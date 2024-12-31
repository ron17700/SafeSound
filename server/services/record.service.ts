import {IRecord, Record} from '../models/record.model';
import { Chunk, Class } from '../models/chunk.model';
import * as fs from "node:fs";
import User from "../models/user.model";

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

    async addRecord(recordData: IRecord & { file: string, isPublic: boolean, longitude: string, latitude: string}): Promise<IRecord> {
        const { userId, name, file, isPublic, longitude, latitude } = recordData;

        const newRecord = new Record({
            userId,
            name,
            image: file,
            public: isPublic,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            }
        });

        try {
            return await newRecord.save();
        } catch (error) {
            console.error('Error adding record', error);
            throw new Error('Error adding record');
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
            throw new Error('Error updating record');
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
                    fs.unlinkSync(chunk.audioFilePath);
                }
                await Chunk.findByIdAndDelete(chunk.id);
            }

            // Delete the record
            if (record.image && record.image !== 'default-files/default-record-image.jpg') {
                fs.unlinkSync(record.image);
            }

            await User.updateMany(
                { favRecords: id },
                { $pull: { favRecords: id } }
            );

            return await Record.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting record', error);
            throw new Error('Error deleting record');
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

        let record = await Record.findById(id);

        if (!record) {
            throw new Error('Record not found');
        }

        record.recordClass = overallTone;
        await record.save();
    },

    getAllPublicRecords(userId: string) {
        return Record.find({ public: true, userId: { $ne: userId } });
    }
};
