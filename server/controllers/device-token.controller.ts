import { Request, Response, NextFunction } from 'express';
import {DeviceTokenService} from '../services/device-token.service';

export const DeviceTokenController = {

    async updateDeviceToken(req: Request, res: Response, next: NextFunction) {
        const { userId, deviceToken } = req.body;
        try {
            const user = await DeviceTokenService.addDeviceToken(userId, deviceToken);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err: any) {
            next(err);
        }
    },
};
