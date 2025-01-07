import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, {IUser} from '../models/user.model';
import {UserService} from "./user.service";

export interface RegisterData {
    userName: string;
    email: string;
    password: string;
    file?: string;
    profileImage?: string;
    isGoogleUser: boolean;
}

interface LoginData {
    email: string;
    password: string;
    isGoogleUser: boolean;
}

export const AuthService = {
    async register({userName, email, password, file, profileImage, isGoogleUser}: RegisterData) {
        const existUser = await UserService.getUserByEmail(email)
        if (existUser) {
            throw new Error('User already exists');
        }
        let newUser: IUser;
        if (isGoogleUser) {
            newUser = new User({userName, email, password: password, profileImage: profileImage});
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            newUser = new User({userName, email, password: hashedPassword, profileImage: file});
        }
        await newUser.save();
        const { password: _, refreshToken: __, ...userWithoutSensitiveData } = newUser.toObject();
        return {status: 201, data: {message: 'User registered successfully', user: userWithoutSensitiveData}};
    },

    async login({email, password, isGoogleUser}: LoginData) {
        const user: IUser | null = await UserService.getUserByEmail(email)
        if (!user) {
            throw new Error('Invalid credentials');
        }

        if (!isGoogleUser) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
        }

        const accessToken = jwt.sign({
            userId: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage
        }, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRES_IN});
        const refreshToken = jwt.sign({userId: user._id}, process.env.JWT_REFRESH_SECRET!, {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN});

        user.refreshToken = refreshToken;
        await user.save();

        return {status: 200, data: {message: 'Login successful', accessToken, refreshToken}};
    },

    async logout(userId: string) {
        const user: IUser | null = await User.findById(userId).select('+refreshToken').exec();

        if (!user) {
            throw new Error('Invalid token');
        }

        user.refreshToken = null;
        await user.save();

        return {status: 200, data: {message: 'Logged out successfully'}};
    },

    async refreshToken(refreshToken: string) {
        const decodedToken: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
        const user: IUser | null = await User.findById(decodedToken.userId).select('+refreshToken').exec();

        if (!user || user.refreshToken !== refreshToken) {
            throw new Error('Invalid refresh token');
        }

        const newAccessToken = jwt.sign({
            userId: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage
        }, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRES_IN});
        return {status: 200, data: {accessToken: newAccessToken}};
    }
};
