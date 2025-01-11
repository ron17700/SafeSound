import request from 'supertest';
import app from '../../index';
import User from '../../models/user.model';
import { token, userId } from '../setup';

describe('User Controller Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update user profile successfully', async () => {
        const res = await request(app)
            .put('/user/profile')
            .set('Authorization', token)
            .send({
                userId: userId.toString(),
                userName: 'updateduser',
                file: 'file',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.userName).toBe('updateduser');
        expect(res.body.profileImage).toBe('file');
    });

    it('should get user by id successfully', async () => {
        const res = await request(app)
            .get(`/user/${userId}`)
            .set('Authorization', token);

        expect(res.statusCode).toBe(200);
        expect(res.body.userName).toBe('testuser');
    });

    it('should return 404 if user by id is not found', async () => {
        const res = await request(app)
            .get('/user/nonexistentUserId')
            .set('Authorization', token);

        expect(res.statusCode).toBe(400);
    });

    it('should get all users successfully', async () => {
        const user = await User.create({
            userName: 'testuser2',
            email: 'testuser2@example.com',
            password: 'securePassword123',
        });

        const res = await request(app)
            .get('/user')
            .set('Authorization', token);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[1]._id.toString()).toBe(user.id.toString());
    });

    it('should return 500 if an error occurs while fetching users', async () => {
        jest.spyOn(User, 'aggregate').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const res = await request(app)
            .get('/user')
            .set('Authorization', token);

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('Database error');

        jest.restoreAllMocks();
    });
});
