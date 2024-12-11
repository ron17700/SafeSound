import { Record, IRecord } from '../models/record.model';  // Adjust the path as necessary

export const RecordService = {
    async getAllRecords(userId: string) {
        return Record.find({userId});
    },

    async addRecord(recordData: IRecord) {
        const newRecord = new Record(recordData);
        return newRecord.save();
    },

    async updateRecord(id: string, recordData: Partial<IRecord>) {
        return Record.findByIdAndUpdate(id, recordData, { new: true });
    },

    async  deleteRecord(id: string): Promise<IRecord | null> {
        try {
            return await Record.findByIdAndRemove(id);
        } catch (error) {
            console.error('Error deleting record', error);
            throw new Error('Error deleting record');
        }
    }
}
