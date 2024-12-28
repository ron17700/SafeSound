import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthorized } from '../middlewares/authorization';
import { uploadController } from '../controllers/upload.controller';

const router = Router();

router.put('/:id', [isAuthorized, uploadController.upload, uploadController.verifyUpload, UserController.updateProfile]);

export default router;
