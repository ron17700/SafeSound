import request from 'supertest';
import express from 'express';
import { RecordController } from '../../controllers/record.controller';
import { RecordService } from '../../services/record.service';
import { UserService } from '../../services/user.service';

const app = express();
app.use(express.json());
app.get('/record', RecordController.getAllRecordsById);
app.get('/record/:id', RecordController.getRecord);
app.post('/record', RecordController.addRecord);
app.put('/record/:id', RecordController.updateRecord);
app.delete('/record/:id', RecordController.deleteRecord);
app.get('/public-records', RecordController.getAllPublicRecords);
app.post('/record/:id/favorite', RecordController.addRecordToFavorite);

describe('RecordController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAllRecordsById', () => {
        it('should get all records by user id', async () => {
            RecordService.getAllRecords = jest.fn().mockResolvedValue([{ id: 'recordId1', name: 'Record 1' }]);

            const response = await request(app)
                .get('/record')
                .send({ userId: 'userId' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 'recordId1', name: 'Record 1' }]);
        });

        it('should return an error if fetching records fails', async () => {
            RecordService.getAllRecords = jest.fn().mockRejectedValue(new Error('Fetch failed'));

            const response = await request(app)
                .get('/record')
                .send({ userId: 'userId' });

            expect(response.status).toBe(500);
        });
    });

    describe('getRecord', () => {
        it('should get a record by id', async () => {
            RecordService.getRecord = jest.fn().mockResolvedValue({ id: 'recordId', name: 'Record' });

            const response = await request(app)
                .get('/record/recordId')
                .send({ userId: 'userId' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 'recordId', name: 'Record' });
        });

        it('should return 404 if record is not found', async () => {
            RecordService.getRecord = jest.fn().mockResolvedValue(null);

            const response = await request(app)
                .get('/record/nonexistentRecordId')
                .send({ userId: 'userId' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Record not found');
        });
    });

    describe('addRecord', () => {
        it('should add a new record', async () => {
            RecordService.addRecord = jest.fn().mockResolvedValue({ id: 'newRecordId', name: 'New Record' });

            const response = await request(app)
                .post('/record')
                .send({ name: 'New Record' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ id: 'newRecordId', name: 'New Record' });
        });

        it('should return an error if adding record fails', async () => {
            RecordService.addRecord = jest.fn().mockRejectedValue(new Error('Add failed'));

            const response = await request(app)
                .post('/record')
                .send({ name: 'New Record' });

            expect(response.status).toBe(500);
        });
    });

    describe('updateRecord', () => {
        it('should update a record', async () => {
            RecordService.updateRecord = jest.fn().mockResolvedValue({ id: 'recordId', name: 'Updated Record' });

            const response = await request(app)
                .put('/record/recordId')
                .send({ name: 'Updated Record' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 'recordId', name: 'Updated Record' });
        });

        it('should return 404 if record is not found', async () => {
            RecordService.updateRecord = jest.fn().mockResolvedValue(null);

            const response = await request(app)
                .put('/record/nonexistentRecordId')
                .send({ name: 'Updated Record' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Record not found');
        });
    });

    describe('deleteRecord', () => {
        it('should delete a record', async () => {
            RecordService.deleteRecord = jest.fn().mockResolvedValue(true);

            const response = await request(app)
                .delete('/record/recordId')
                .send({ userId: 'userId' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Record deleted successfully');
        });

        it('should return 404 if record is not found', async () => {
            RecordService.deleteRecord = jest.fn().mockResolvedValue(false);

            const response = await request(app)
                .delete('/record/nonexistentRecordId')
                .send({ userId: 'userId' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Record not found');
        });
    });

    describe('getAllPublicRecords', () => {
        it('should get all public records', async () => {
            UserService.getFavoriteRecords = jest.fn().mockResolvedValue([{ id: 'recordId1' }]);
            RecordService.getAllPublicRecords = jest.fn().mockResolvedValue([{ _id: 'recordId1', name: 'Public Record 1', createdAt: new Date(), public: true }]);

            const response = await request(app)
                .get('/public-records')
                .send({ userId: 'userId' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ _id: 'recordId1', name: 'Public Record 1', createdAt: expect.any(String), public: true, isFavorite: true }]);
        });

        it('should return an error if fetching public records fails', async () => {
            RecordService.getAllPublicRecords = jest.fn().mockRejectedValue(new Error('Fetch failed'));

            const response = await request(app)
                .get('/public-records')
                .send({ userId: 'userId' });

            expect(response.status).toBe(500);
        });
    });

    describe('addRecordToFavorite', () => {
        it('should add a record to favorites', async () => {
            RecordService.getRecordById = jest.fn().mockResolvedValue({ id: 'recordId', public: true, userId: 'otherUserId' });
            UserService.addRecordToFavorite = jest.fn().mockResolvedValue({ id: 'userId', favoriteRecords: ['recordId'] });

            const response = await request(app)
                .post('/record/recordId/favorite')
                .send({ userId: 'userId' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 'userId', favoriteRecords: ['recordId'] });
        });

        it('should return an error if record is not public', async () => {
            RecordService.getRecordById = jest.fn().mockResolvedValue({ id: 'recordId', public: false, userId: 'otherUserId' });

            const response = await request(app)
                .post('/record/recordId/favorite')
                .send({ userId: 'userId' });

            expect(response.status).toBe(500);
            if (response.error && 'text' in response.error) {
                expect(response.error.text).toContain('You can only like public records');
            }
        });

        it('should return an error if user tries to like their own record', async () => {
            RecordService.getRecordById = jest.fn().mockResolvedValue({ id: 'recordId', public: true, userId: 'userId' });

            const response = await request(app)
                .post('/record/recordId/favorite')
                .send({ userId: 'userId' });

            expect(response.status).toBe(500);
            if (response.error && 'text' in response.error) {
                expect(response.error.text).toContain('You cannot like your own record');
            }
        });
    });
});
