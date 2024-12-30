import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthorized } from '../middlewares/authorization';
import { uploadController } from '../controllers/upload.controller';

const router = Router();

router.get('/:id', [isAuthorized, UserController.getUserById]);
router.put('/:id', [isAuthorized, uploadController.upload, uploadController.verifyUpload, isAuthorized, UserController.updateProfile]);
export default router;
