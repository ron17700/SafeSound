import {IRecord, Record} from '../models/record.model';

export const RecordService = {
    async getAllRecords(userId: string) {
        return Record.find({userId});
    },

    async getRecord(id: string) {
        return Record.findById(id);
    },

    async addRecord(recordData: IRecord) {
        const newRecord = new Record({
            userId: recordData.userId,
            startTime: recordData.startTime,
            endTime: recordData.endTime,
            summary: recordData.summary,
            name: recordData.name,
            image: recordData.image,
        });

        try {
            return await newRecord.save();
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
