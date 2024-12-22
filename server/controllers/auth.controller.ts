import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export const AuthController = {
    async register(req: Request, res: Response, next: NextFunction) {
        const { username, email, password, firstName, lastName, age, file } = req.body;
        try {
            const response = await AuthService.register({ username, email, password, firstName, lastName, age, file });
            res.status(response.status).json(response.data);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const response = await AuthService.login({ email, password });
            res.status(response.status).json(response.data);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.body;
        try {
            const response = await AuthService.logout(userId);
            res.status(response.status).json(response.data);
        } catch (err: any) {
            res.status(err.status || 400).json({ error: err.message });
        }
    },

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        const { refreshToken } = req.body;
        try {
            const response = await AuthService.refreshToken(refreshToken);
            res.status(response.status).json(response.data);
        } catch (err: any) {
            res.status(err.status || 400).json({ error: err.message });
        }
    }
};
