import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {refreshToken} from "../setup";
import mongoose from "mongoose";
import User, {IUser} from "../../models/user.model";

describe('AuthService', () => {

    describe('register', () => {
        it('should register a new user', async () => {
            bcrypt.genSalt = jest.fn().mockResolvedValue('salt');
            bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

            const result = await AuthService.register({
                userName: 'testUser',
                email: 'test@example.com',
                password: 'password',
                isGoogleUser: false,
            });

            expect(result.status).toBe(201);
            expect(result.data.message).toBe('User registered successfully');
            expect(result.data.user.userName).toEqual('testUser');
            expect(result.data.user.email).toEqual('test@example.com');
            expect(result.data.user.profileImage).toEqual('default-files/default-profile-image.jpg');
        });

        it('should throw an error if user already exists', async () => {
            UserService.getUserByEmail = jest.fn().mockResolvedValue(true);

            await expect(AuthService.register({
                userName: 'testUser',
                email: 'test@example.com',
                password: 'password',
                isGoogleUser: false,
            })).rejects.toThrow('User already exists');

            jest.restoreAllMocks();
        });

        it('should sign in with google', async () => {
            UserService.getUserByEmail = jest.fn().mockResolvedValue(false);

            const email = `test${Date.now()}@example.com`;
            const result = await AuthService.register({
                userName: 'testUser',
                email,
                password: 'password',
                isGoogleUser: true,
            });

            expect(result.status).toBe(201);
            expect(result.data.message).toBe('User registered successfully');
            expect(result.data.user.userName).toEqual('testUser');
            expect(result.data.user.email).toEqual(email);
            expect(result.data.user.profileImage).toEqual('default-files/default-profile-image.jpg');
        });
    });

    describe('login', () => {
        it('should login a user with valid credentials', async () => {
            const mockUser = {
                _id: 'userId',
                userName: 'testUser',
                email: 'test@example.com',
                password: 'hashedPassword',
                profileImage: 'profileImage',
                save: jest.fn().mockResolvedValue(true),
            };
            UserService.getUserByEmail = jest.fn().mockResolvedValue(mockUser);
            bcrypt.compare = jest.fn().mockResolvedValue(true);
            jwt.sign = jest.fn().mockReturnValue('token');

            const result = await AuthService.login({
                email: 'test@example.com',
                password: 'password',
                isGoogleUser: false,
            });

            expect(result).toEqual({
                status: 200,
                data: {
                    message: 'Login successful',
                    accessToken: 'token',
                    refreshToken: 'token',
                },
            });
        });

        it('should throw an error if credentials are invalid', async () => {
            UserService.getUserByEmail = jest.fn().mockResolvedValue(null);

            await expect(AuthService.login({
                email: 'test@example.com',
                password: 'password',
                isGoogleUser: false,
            })).rejects.toThrow('Invalid credentials');
        });

        it('should sign in with google', async () => {
            const mockUser = {
                _id: 'userId',
                userName: 'testUser',
                email: 'test@example.com',
                password: 'hashedPassword',
                profileImage: 'profileImage',
                save: jest.fn().mockResolvedValue(true),
            };
            UserService.getUserByEmail = jest.fn().mockResolvedValue(mockUser);
            bcrypt.compare = jest.fn().mockResolvedValue(true);
            jwt.sign = jest.fn().mockReturnValue('token');

            const result = await AuthService.login({
                email: 'test@example.com',
                password: 'password',
                isGoogleUser: true,
            });

            expect(result).toEqual({
                status: 200,
                data: {
                    message: 'Login successful',
                    accessToken: 'token',
                    refreshToken: 'token',
                },
            });
        });
    });

    describe('logout', () => {

        it('should log out a user', async () => {
            const user = await User.create<Partial<IUser>>({
                _id: new mongoose.Types.ObjectId(),
                userName: 'testuser',
                email: `testuser123@example.com`,
                refreshToken,
                password: 'password',
            });

            await AuthService.login({
                email: 'testuser123@example.com',
                password: 'password',
                isGoogleUser: true,
            });

            const result = await AuthService.logout(user.id);

            expect(result).toEqual({
                status: 200,
                data: {
                    message: 'Logged out successfully',
                },
            });
        });

    });

});
