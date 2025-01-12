import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../index';
import User, { IUser } from '../../models/user.model';
import { token, refreshToken } from '../setup';
import mongoose from "mongoose";

describe('Authentication Controller Tests', () => {
    let userId: string;
    let userName: string;
    let userEmail: string;

    beforeEach(() => {
        const mongoUserId = new mongoose.Types.ObjectId();
        userId = mongoUserId.toString();
        userName = `testuser-${Date.now()}`;
        userEmail = `testuser${Date.now()}@example.com`;
        jest.clearAllMocks();
    });

    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                userName,
                email: userEmail,
                password: 'securePassword123',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered successfully');
        expect(res.body.user).toHaveProperty('_id');
    });

    it('should return 400 if email already exists during registration', async () => {
        await User.create<Partial<IUser>>({
            userName,
            email: userEmail,
            password: 'securePassword123',
        });

        const res = await request(app)
            .post('/auth/register')
            .send({
                userName: 'dana',
                email: userEmail,
                password: 'securePassword123',
            });

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('User already exists');
    });

    it('should return 500 if an error occurs during registration', async () => {
        jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const res = await request(app)
            .post('/auth/register')
            .send({
                userName: 'john_doe',
                email: 'john.doe@example.com',
                password: 'securePassword123',
            });

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('Database error');

        jest.restoreAllMocks();
    });

    it('should log in an existing user successfully', async () => {
        const password = await bcrypt.hash('securePassword123', 10);
        await User.create<Partial<IUser>>({
            userName,
            email: userEmail,
            password,
        });

        const res = await request(app)
            .post('/auth/login')
            .send({
                email: userEmail,
                password: 'securePassword123',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Login successful');
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
    });

    it('should return 400 for invalid credentials during login', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'invalid@example.com',
                password: 'wrongPassword',
            });

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('Invalid credentials');
    });

    it('should return 500 if an error occurs during login', async () => {
        jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'john.doe@example.com',
                password: 'securePassword123',
            });

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('Database error');

        jest.restoreAllMocks();
    });

    it('should log out a user and invalidate the refresh token', async () => {
        await User.create<Partial<IUser>>({
            userName,
            email: userEmail,
            password: await bcrypt.hash('securePassword123', 10),
            refreshToken,
        });

        const res = await request(app)
            .post('/auth/logout')
            .set('Authorization', token)
            .send({ refreshToken });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Logged out successfully');

        const updatedUser = await User.findById(userId).select('+refreshToken');
        expect(updatedUser?.refreshToken).toEqual(undefined);
    });

    it('should refresh the access token successfully', async () => {
        await User.create<Partial<IUser>>({
            userName,
            email: userEmail,
            password: await bcrypt.hash('securePassword123', 10),
            refreshToken,
        });

        const res = await request(app)
            .post('/auth/refresh-token')
            .send({ refreshToken });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('accessToken');
    });

    it('should return 400 for an invalid refresh token during refresh', async () => {
        const res = await request(app)
            .post('/auth/refresh-token')
            .send({ refreshToken: 'invalidToken' });

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('jwt malformed');
    });

    it('should return 403 for a missing refresh token during refresh', async () => {
        const res = await request(app).post('/auth/refresh-token');

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('jwt must be provided');
    });
});
