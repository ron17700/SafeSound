import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export const AuthController = {
    async register(req: Request, res: Response, next: NextFunction) {
        const { username, email, password, file } = req.body;
        try {
            const response = await AuthService.register({ username, email, password, file });
            res.status(response.status).json(response.data);
        } catch (err: any) {
            next(err);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const response = await AuthService.login({ email, password });
            res.status(response.status).json(response.data);
        } catch (err: any) {
            next(err);
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.body;
        try {
            const response = await AuthService.logout(userId);
            res.status(response.status).json(response.data);
        } catch (err: any) {
            next(err);
        }
    },

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        const { refreshToken } = req.body;
        try {
            const response = await AuthService.refreshToken(refreshToken);
            res.status(response.status).json(response.data);
        } catch (err: any) {
            next(err);
        }
    }
};
