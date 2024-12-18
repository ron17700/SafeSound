import { Request, Response, NextFunction } from 'express';
import { UploadService } from "../services/upload.service";
import {RecordService} from "../services/record.service";

export const uploadController = {
    async upload(req: Request, res: Response) {
        UploadService.single('image')
    },

    async verifyUpload(req: Request, res: Response, next: NextFunction) {
        const imageFile = req.file; // multer attaches the file information to req.file

        try {
            if (!imageFile) {
                res.status(400).send('No file uploaded.');
                return;
            }

            const base64Image = imageFile.buffer.toString('base64');
            const updatedRecord = await RecordService.updateRecord(req.params.id, {
                image: base64Image,
                ...req.body
            });

            res.json(updatedRecord);
        } catch (err) {
            res.status(500).send((err as Error).message);
        }
    },
};
