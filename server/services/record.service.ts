import { Record, IRecord } from '../models/record.model';  // Adjust the path as necessary

export const RecordService = {
    async getAllRecords(userId: string) {
        return await Record.find({ userId });
    },

    async addRecord(recordData: IRecord) {
        const newRecord = new Record(recordData);
        return newRecord.save();
    },

    async updateRecord(id: string, recordData: Partial<IRecord>) {
        return await Record.findByIdAndUpdate(id, recordData, { new: true });
    },

    async deleteRecord(id: string) {
        return await Record.findByIdAndRemove(id);
    }
}
