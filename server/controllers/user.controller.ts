import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export const UserController = {
    async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.body.userId;
            const updatedUser = await UserService.updateProfile(userId, req.body);
            res.json(updatedUser);
        } catch (err: any) {
            next(err);
        }
    }
}
