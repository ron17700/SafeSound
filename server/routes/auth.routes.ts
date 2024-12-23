import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

import { isAuthorized } from '../middlewares/authorization';
import {uploadController} from "../controllers/upload.controller";

const router = Router();

router.post('/register', [uploadController.upload, uploadController.verifyUpload, AuthController.register]);
router.post('/login', AuthController.login);
router.post('/logout', isAuthorized, AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

export default router;
