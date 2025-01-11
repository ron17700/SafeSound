import { Request, Response, NextFunction } from 'express';
import {AuthService, RegisterData} from '../services/auth.service';
import {UserService} from "../services/user.service";
import {saveImageFromUrl} from "../services/Image-fetcher";

export const AuthController = {
    async register(req: Request, res: Response, next: NextFunction) {
        const { userName, email, password, file } = req.body;
        try {
            const response = await AuthService
                .register({ isGoogleUser: false, userName, email, password, file});
            res.status(response.status).json(response.data);
        } catch (err: any) {
            next(err);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const response = await AuthService
                .login({isGoogleUser: false, email, password });
            res.status(response.status).json(response.data);
        } catch (err: any) {
            next(err);
        }
    },

    async handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
        const redirectRoute = `/auth/google/callback`;
        const googleDefaultPass = 'NotNeededToSignInWithGoogle'
        const googleUser = req?.user as { email: string; userName: string; profileImage: string };
        if (!googleUser) {
            return next(new Error("Something happened while trying to login with Google"))
        }
        try {
            const existingUser = await UserService.getUserByEmail(googleUser.email);
            if (existingUser) {
                const response = await AuthService
                    .login({isGoogleUser: true, email: googleUser.email, password: googleDefaultPass })
                return res.redirect(`${redirectRoute}?accessToken=${response.data.accessToken}&refreshToken=${response.data.refreshToken}`);
            } else {
                const registrationData: RegisterData ={
                    isGoogleUser: true,
                    userName: googleUser.userName,
                    email: googleUser.email,
                    password: googleDefaultPass,
                };
                const savedPath = await saveImageFromUrl(googleUser.profileImage);
                if (savedPath) registrationData.profileImage = savedPath.toString();
                const registerResponse = await AuthService.register(registrationData);
                if (registerResponse.status === 201) {
                    const loginResponse = await AuthService
                        .login({ isGoogleUser: true, email: googleUser.email, password: googleDefaultPass });
                    return res.redirect(`${redirectRoute}?accessToken=${loginResponse.data.accessToken}&refreshToken=${loginResponse.data.refreshToken}`);
                }
                res.redirect(`${redirectRoute}`);
            }
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
