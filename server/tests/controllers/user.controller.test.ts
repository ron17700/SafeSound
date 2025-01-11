import request from 'supertest';
import express from 'express';
import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../services/user.service';

const app = express();
app.use(express.json());
app.put('/user/profile', UserController.updateProfile);
app.get('/user/:id', UserController.getUserById);
app.get('/users', UserController.getAllUsers);

describe('UserController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('updateProfile', () => {
        it('should update user profile', async () => {
            UserService.updateProfile = jest.fn().mockResolvedValue({ id: 'userId', name: 'Updated User' });

            const response = await request(app)
                .put('/user/profile')
                .send({ userId: 'userId', name: 'Updated User' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 'userId', name: 'Updated User' });
        });

        it('should return an error if update fails', async () => {
            UserService.updateProfile = jest.fn().mockRejectedValue(new Error('Update failed'));

            const response = await request(app)
                .put('/user/profile')
                .send({ userId: 'userId', name: 'Updated User' });

            expect(response.status).toBe(500);
        });
    });

    describe('getUserById', () => {
        it('should get user by id', async () => {
            UserService.getUserById = jest.fn().mockResolvedValue({ id: 'userId', name: 'Test User' });

            const response = await request(app)
                .get('/user/userId');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 'userId', name: 'Test User' });
        });

        it('should return 404 if user is not found', async () => {
            UserService.getUserById = jest.fn().mockResolvedValue(null);

            const response = await request(app)
                .get('/user/nonexistentUserId');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });
    });

    describe('getAllUsers', () => {
        it('should get all users', async () => {
            UserService.getAllUsers = jest.fn().mockResolvedValue([{ id: 'userId1', name: 'User 1' }, { id: 'userId2', name: 'User 2' }]);

            const response = await request(app)
                .get('/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 'userId1', name: 'User 1' }, { id: 'userId2', name: 'User 2' }]);
        });

        it('should return an error if fetching users fails', async () => {
            UserService.getAllUsers = jest.fn().mockRejectedValue(new Error('Fetch failed'));

            const response = await request(app)
                .get('/users');

            expect(response.status).toBe(500);
        });
    });
});
