import { Request, Response } from 'express';
import { RecordService } from '../services/record.service';

export const RecordController  = {
    async getRecords (req: Request, res: Response) {
        try {
            const userId = req.body.id; // Assuming you have the logged-in user ID
            const records = await RecordService.getAllRecords(userId);
            res.json(records);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async addRecord (req: Request, res: Response) {
        try {
            const newRecord = await RecordService.addRecord(req.body);
            res.status(201).json(newRecord);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    },

    async updateRecord (req: Request, res: Response)  {
        try {
            const updatedRecord = await RecordService.updateRecord(req.params.id, req.body);
            if (!updatedRecord) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.json(updatedRecord);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    },

    async deleteRecord (req: Request, res: Response) {
        try {
            const deletedRecord = await RecordService.deleteRecord(req.params.id);
            if (!deletedRecord) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.json({ message: 'Record deleted successfully' });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}
