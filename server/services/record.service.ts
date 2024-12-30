import {IRecord, Record} from '../models/record.model';
import { Chunk, Class } from '../models/chuck.model';

export const RecordService = {
    async getAllRecords(userId: string) {
        return await Record.find({userId});
    },

    async getRecord(userId: string, id: string) {
        return await Record.findOne({userId, _id: id});
    },

    async addRecord(recordData: IRecord & { file: string }): Promise<IRecord> {
        const newRecord = new Record({
            userId: recordData.userId,
            name: recordData.name,
            image: recordData.file,
        });

        try {
            return await newRecord.save();
        } catch (error) {
            console.error('Error adding record', error);
            throw new Error('Error adding record');
        }
    },

    async updateRecord(id: string, recordData: Partial<IRecord>) {
        const record = await Record.findOne({userId: recordData.userId, _id: id});

        if (!record) {
            throw new Error('Record not found');
        }

        Object.assign(record, recordData);

        try {
            return await record.save();
        } catch (error) {
            console.error('Error updating record', error);
            throw new Error('Error updating record');
        }
    },

    async deleteRecord(id: string): Promise<IRecord | null> {
        try {
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
            switch (chunk.class){
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
    }
};
