import {IRecord, Record} from '../models/record.model';

export const RecordService = {
    async getAllRecords(userId: string) {
        return await Record.find({userId});
    },

    async getRecord(userId: string, id: string) {
        return await Record.findOne({userId, _id: id});
    },

    async addRecord(recordData: IRecord & {file: string}): Promise<IRecord> {
        const newRecord = new Record({
            userId: recordData.userId,
            startTime: recordData.startTime,
            endTime: recordData.endTime,
            summary: recordData.summary,
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

        return record;
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
