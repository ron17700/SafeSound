import {NextFunction, Request, Response} from 'express';
import {UploadService} from "../services/upload.service";
import path from 'path';

export const uploadController = {
    upload: UploadService.single('image'),

    async verifyUpload(req: Request, res: Response, next: NextFunction) {
        const imageFile = req.file; // multer attaches the file information to req.file

        try {
            if (!imageFile) {
                next();
            } else {
                req.body.image = path.join('uploads/images', imageFile.filename); // Add the file path to the request body
                next()
            }

        } catch (err) {
            res.status(500).send((err as Error).message);
        }
    },
};
