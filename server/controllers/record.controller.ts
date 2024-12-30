import { Request, Response, NextFunction } from 'express';
import { RecordService } from '../services/record.service';
import {UserService} from "../services/user.service";

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
            const deletedRecord = await RecordService.deleteRecord(req.params.id, req.body.userId);
            if (!deletedRecord) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.json({ message: 'Record deleted successfully' });
        } catch (err: any) {
            next(err);
        }
    },

    async getAllPublicRecords(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.body.userId;
            const favoriteRecords = await UserService.getFavoriteRecords(userId);
            const publicRecords = await RecordService.getAllPublicRecords(userId);

            const favoriteRecordIds = new Set(favoriteRecords.map(record => record.id.toString()));

            const sortedRecords = publicRecords.map(record => ({
                ...record.toObject(),
                isFavorite: favoriteRecordIds.has(record.id.toString())
            })).sort((a, b) => {
                if (a.isFavorite && !b.isFavorite) return -1;
                if (!a.isFavorite && b.isFavorite) return 1;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            res.json(sortedRecords);
        } catch (err: any) {
            next(err);
        }
    },

    async addRecordToFavorite (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.body.userId;
            const recordId = req.params.id;
            const record = await RecordService.getRecordById(recordId);

            // Check if the record is public and not owned by the user
            if (!record?.public) {
                throw Error('You can only like public records');
            }
            if (record?.userId.toString() === userId) {
                throw Error('You cannot like your own record');
            }

            const user = await UserService.addRecordToFavorite(userId, recordId);
            res.json(user);
        } catch (err: any) {
            next(err);
        }
    }
}
