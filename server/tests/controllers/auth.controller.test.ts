import request from 'supertest';
import express from 'express';
import { AuthController } from '../../controllers/auth.controller';
import { AuthService } from '../../services/auth.service';

const app = express();
app.use(express.json());
app.post('/register', AuthController.register);
app.post('/login', AuthController.login);
app.post('/logout', AuthController.logout);
app.post('/refresh-token', AuthController.refreshToken);
app.post('/login/google/callback', AuthController.handleGoogleCallback);
app.use((req, res, next) => {
    req.user = { email: 'test@example.com', userName: 'testUser' };
    next();
});

describe('AuthController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should register a new user', async () => {
            AuthService.register = jest.fn().mockResolvedValue({
                status: 201,
                data: { message: 'User registered successfully', user: { userName: 'testUser', email: 'test@example.com' } }
            });

            const response = await request(app)
                .post('/register')
                .send({ userName: 'testUser', email: 'test@example.com', password: 'password', file: 'profileImage' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'User registered successfully', user: { userName: 'testUser', email: 'test@example.com' } });
            jest.restoreAllMocks();
        });

        it('should return an error if user already exists', async () => {
            AuthService.register = jest.fn().mockRejectedValue(new Error('User already exists'));

            const response = await request(app)
                .post('/register')
                .send({ userName: 'testUser', email: 'test@example.com', password: 'password', file: 'profileImage' });

            expect(response.status).toBe(500);
        });
    });

    describe('login', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should login a user with valid credentials', async () => {
            AuthService.login = jest.fn().mockResolvedValue({
                status: 200,
                data: { message: 'Login successful', accessToken: 'accessToken', refreshToken: 'refreshToken' }
            });

            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'password' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Login successful', accessToken: 'accessToken', refreshToken: 'refreshToken' });
        });

        it('should return an error if credentials are invalid', async () => {
            AuthService.login = jest.fn().mockRejectedValue(new Error('Invalid credentials'));

            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'password' });

            expect(response.status).toBe(500);
        });
    });

    describe('logout', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should logout a user', async () => {
            AuthService.logout = jest.fn().mockResolvedValue({
                status: 200,
                data: { message: 'Logged out successfully' }
            });

            const response = await request(app)
                .post('/logout')
                .send({ userId: 'userId' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Logged out successfully' });
        });
    });

    describe('refreshToken', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should refresh the access token', async () => {
            AuthService.refreshToken = jest.fn().mockResolvedValue({
                status: 200,
                data: { accessToken: 'newAccessToken' }
            });

            const response = await request(app)
                .post('/refresh-token')
                .send({ refreshToken: 'refreshToken' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ accessToken: 'newAccessToken' });
        });

        it('should return an error if refresh token is invalid', async () => {
            AuthService.refreshToken = jest.fn().mockRejectedValue(new Error('Invalid refresh token'));

            const response = await request(app)
                .post('/refresh-token')
                .send({ refreshToken: 'invalidRefreshToken' });

            expect(response.status).toBe(500);
        });
    });

    describe('handleGoogleCallback', () => {

            afterEach(() => {
                jest.restoreAllMocks();
            });

            // it('should handle Google callback and register a new user', async () => {
            //     const response = await request(app)
            //         .post('/login/google/callback')
            //         .set('Authorization', 'Bearer testToken')
            //         .send();
            //
            //     expect(response.status).toBe(200);
            // });

            it('should not handle Google callback', async () => {
            const response = await request(app)
                .post('/login/google/callback')
                .send({
                    user: {
                        email: 'test@example.com',
                        userName: "testUser",
                    }
                });

            expect(response.status).toBe(500);
        });

    });
});
