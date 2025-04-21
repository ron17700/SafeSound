import { Request, Response, NextFunction } from 'express';
import {DeviceTokenService} from '../services/device-token.service';

export const DeviceTokenController = {

    async updateDeviceInfo(req: Request, res: Response, next: NextFunction) {
        const { userId, fcmToken } = req.body;
        try {
            const device = await DeviceTokenService.addDeviceToken(userId, fcmToken);
            res.json(device);
        } catch (err: any) {
            next(err);
        }
    },
};
