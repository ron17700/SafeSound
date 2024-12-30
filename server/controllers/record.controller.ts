import { Request, Response, NextFunction } from 'express';
import { RecordService } from '../services/record.service';

export const RecordController  = {
    async getAllRecordsById (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.body.userId;
            const records = await RecordService.getAllRecords(userId);
            res.json(records);
        } catch (err: any) {
            next(err);
        }
    },

    async getRecord (req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const userId = req.body.userId;
            const record = await RecordService.getRecord(userId, id);
            res.json(record);
        } catch (err: any) {
            next(err);
        }
    },

    async addRecord (req: Request, res: Response, next: NextFunction) {
        try {
            const newRecord = await RecordService.addRecord(req.body);
            res.status(201).json(newRecord);
        } catch (err: any) {
            next(err);
        }
    },

    async updateRecord (req: Request, res: Response, next: NextFunction) {
        try {
            const updatedRecord = await RecordService.updateRecord(req.params.id, req.body);
            if (!updatedRecord) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.json(updatedRecord);
        } catch (err: any) {
            next(err);
        }
    },

    async deleteRecord (req: Request, res: Response, next: NextFunction) {
        try {
            const deletedRecord = await RecordService.deleteRecord(req.params.id);
            if (!deletedRecord) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.json({ message: 'Record deleted successfully' });
        } catch (err: any) {
            next(err);
        }
    },

    async getAllPublicRecords (req: Request, res: Response, next: NextFunction) {
        return RecordService.getAllPublicRecords()
            .then(records => res.json(records))
            .catch(err => next(err));
    }
}
