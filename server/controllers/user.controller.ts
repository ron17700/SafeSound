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
    },

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const user = await UserService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err: any) {
            next(err);
        }
    },

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const users = await UserService.getAllUsers();
            
            res.json(users);
        } catch (err: any) {
            next(err);
        }
    }
}
