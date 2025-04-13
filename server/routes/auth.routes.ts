import {Router} from 'express';
import {AuthController} from '../controllers/auth.controller';
import {DeviceTokenController} from '../controllers/device-token.controller';
import {isAuthorized} from '../middlewares/authorization';
import {uploadController} from "../controllers/upload.controller";
import passport from "../middlewares/passport";

const router = Router();

router.post('/register', [uploadController.upload, uploadController.verifyUpload, AuthController.register]);
router.post('/login', AuthController.login);
router.post('/logout', isAuthorized, AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

router.get('/login/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/login/google/callback', passport.authenticate('google', { session: false }), AuthController.handleGoogleCallback)

router.put('/fcm-token', [isAuthorized, DeviceTokenController.updateDeviceToken]);

export default router;
