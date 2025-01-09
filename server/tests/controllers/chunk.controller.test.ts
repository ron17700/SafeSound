import request from 'supertest';
import express from 'express';
import { ChunkController } from '../../controllers/chunk.controller';
import { ChunkService } from '../../services/chunk.service';
import { userId, token } from '../setup';
import { IRecord, Record } from '../../models/record.model';

const app = express();
app.use(express.json());
app.post('/chunks/:recordId', ChunkController.addChunk);
app.get('/chunks/:id', ChunkController.getChunk);
app.get('/record/:recordId/chunks', ChunkController.getAllChunks);
app.post('/record/:recordId/chunks/:id/comments', ChunkController.addCommentToChunk);
app.post('/record/:recordId/chunk', ChunkController.addChunk);

describe('ChunkController', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('addChunk', () => {

        it('should add a new chunk', async () => {
            ChunkService.addChunk = jest.fn().mockResolvedValueOnce({ id: 'chunkId', name: 'chunkName' });

            const response = await request(app)
                .post('/chunks/recordId')
                .send({ file: 'audioFilePath', otherData: 'data' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ id: 'chunkId', name: 'chunkName' });
        });

        it('should return an error if audio file is missing', async () => {
            const response = await request(app)
                .post('/chunks/recordId')
                .send({ otherData: 'data' });

            expect(response.status).toBe(500);
        });
    });

    describe('getChunk', () => {
        it('should get a chunk by id', async () => {
            ChunkService.getChunk = jest.fn().mockResolvedValue({ id: 'chunkId', name: 'chunkName' });

            const response = await request(app)
                .get('/chunks/chunkId');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 'chunkId', name: 'chunkName' });
        });

        it('should return 404 if chunk is not found', async () => {
            ChunkService.getChunk = jest.fn().mockResolvedValue(null);

            const response = await request(app)
                .get('/chunks/nonexistentChunkId');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Chunk not found');
        });
    });

    describe('addCommentToChunk', () => {
        it('should add a comment to a chunk', async () => {
            ChunkService.addCommentToChunk = jest.fn().mockResolvedValue({ id: 'chunkId', comments: ['comment'] });

            const response = await request(app)
                .post('/record/recordId/chunks/chunkId/comments')
                .send({ userId: 'userId', comment: 'comment' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 'chunkId', comments: ['comment'] });
        });
    });

    describe('getAllChunks', () => {

        it('should get all chunks for a record', async () => {
            jest.resetAllMocks();

            const record = await Record.create<Partial<IRecord>>({
                userId: userId.toString(),
                name: 'New Record',
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
            });
            const recordId = (record._id as string).toString();

            const chunk1 = await request(app)
                .post(`/record/${recordId}/chunk`)
                .set('Authorization', token)
                .send({
                    userId,
                    startTime: new Date(),
                    endTime: new Date(),
                    status: 'not-started',
                    file: 'path/to/audio/file.mp3',
                });

            const chunk2 = await request(app)
                .post(`/record/${recordId}/chunk`)
                .set('Authorization', token)
                .send({
                    userId,
                    startTime: new Date(),
                    endTime: new Date(),
                    status: 'not-started',
                    file: 'path/to/audio/file.mp3',
                });

            const response = await request(app)
                .get(`/record/${recordId}/chunks`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            // expect(response.body.length).toBe(2);
            // expect(response.body[0]._id).toBe(chunk1.body._id);
            // expect(response.body[1]._id).toBe(chunk2.body._id);
        });
    });
});

