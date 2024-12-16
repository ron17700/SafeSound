import { Record, IRecord } from '../models/record.model';
import {IChunkScheme} from "../models/chuck.model";  // Adjust the path as necessary

export const RecordService = {
    async getAllRecords(userId: string) {
        return Record.find({userId});
    },

    async getAllChunks(recordId: string): Promise<IChunkScheme[] | null> {
        const result = await Record.findOne({ recordId }).exec();
        return result?.chunks ? result.chunks : null;
    },

    async getChunk(recordId: string, chunkId: string): Promise<IChunkScheme | any> {
        const result = await Record.findOne({ recordId, chunkId });
        if (result?.chunks) {
            return result.chunks.find(chunk => chunk.chunkId === chunkId);
        }
        return {};
    },

    async getRecord(id: string) {
        return Record.find({id});
    },

    async addRecord(recordData: IRecord) {
        const newRecord = new Record({
            userId: recordData.userId,
            startTime: recordData.startTime,
            endTime: recordData.endTime,
            summary: recordData.summary,
            chunks: recordData.chunks
        });

        try {

            const result = await newRecord.save();
            return result;
        } catch (error) {
            console.error('Error adding record', error);
            throw new Error('Error adding record');
        }
    },

    async updateRecord(id: string, recordData: Partial<IRecord>) {
        return Record.findByIdAndUpdate(id, recordData);
    },

    async  deleteRecord(id: string): Promise<IRecord | null> {
        try {
            return await Record.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting record', error);
            throw new Error('Error deleting record');
        }
    }
}
