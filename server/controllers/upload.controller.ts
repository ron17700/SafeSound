import { Request, Response, NextFunction } from 'express';
import { UploadService } from "../services/upload.service";

export const uploadController = {
    async upload(req: Request, res: Response) {
        UploadService.single('image')
    },

    async verifyUpload(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
            res.status(200).send('File uploaded successfully.');
        } catch (err) {
            res.status(500).send((err as Error).message);
        }
    },
};
