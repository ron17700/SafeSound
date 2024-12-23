import {NextFunction, Request, Response} from 'express';
import {UploadService} from "../services/upload.service";
import path from 'path';

export const uploadController = {
    upload: UploadService.single('file'),

    async verifyUpload(req: Request, res: Response, next: NextFunction) {
        const file = req.file; // multer attaches the file information to req.file

        try {
            if (!file) {
                next();
            } else {
                req.body.file = path.join('uploads/', file.filename); // Add the file path to the request body
                next()
            }

        } catch (err) {
            res.status(500).send((err as Error).message);
        }
    },
};
