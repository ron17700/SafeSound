import request from 'supertest';
import app from '../../index';
import {IRecord, Record} from '../../models/record.model';
import { token, userId } from '../setup';
// import {ChunkService} from "../../services/chunk.service";
// import {Chunk, IChunkScheme} from "../../models/chunk.model";

describe('Record Controller Tests', () => {

    describe('Record Creation', () => {
        it('should create a new record successfully', async () => {
            const res = await request(app)
                .post('/record')
                .set('Authorization', token)
                .send({
                    userId,
                    name: 'New Record',
                    isPublic: true,
                    longitude: 40.7128,
                    latitude: -74.0060,
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.name).toBe('New Record');
        });

        it('should return 400 if required fields are missing - name', async () => {
            const res = await request(app)
                .post('/record')
                .set('Authorization', token)
                .send({
                });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Missing required fields');
        });


        it('should return 500 if an error occurs during record creation', async () => {
            jest.spyOn(Record.prototype, 'save').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const res = await request(app)
                .post('/record')
                .set('Authorization', token)
                .send({
                    userId,
                    name: 'New Record',
                    isPublic: true,
                    longitude: 40.7128,
                    latitude: -74.0060,
                });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Error adding record');

            jest.restoreAllMocks();
        });
    });

    describe('Record Update', () => {
        it('should update a record successfully', async () => {
            const record = await Record.create<Partial<IRecord>>({
                name: 'New Record',
                userId: userId.toString(),
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
            });

            const res = await request(app)
                .put(`/record/${record._id}`)
                .set('Authorization', token)
                .send({
                    name: 'Updated Record',
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe('Updated Record');
        });

        it('should return 404 if record is not found during update', async () => {
            const res = await request(app)
                .put('/record/60b4c3e3c9e77c0015f2f4f4')
                .set('Authorization', token)
                .send({
                    name: 'Updated Record',
                });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Record not found');
        });
    });

    describe('Record Deletion', () => {
        it('should delete a record successfully', async () =>  {
            const record = await Record.create<Partial<IRecord>>({
                userId: userId.toString(),
                name: 'New Record',
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
            });

            const res = await request(app)
                .delete(`/record/${record._id}`)
                .set('Authorization', token)
                .send({ userId });

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Record deleted successfully');
        });

        it('should return 404 if record is not found during delete', async () => {
            const res = await request(app)
                .delete('/record/60b4c3e3c9e77c0015f2f4f4')
                .set('Authorization', token)
                .send({ userId });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Error deleting record');
        });

        it('should return 404 if record does not belong to the user during delete', async () => {
            const record = await Record.create<Partial<IRecord>>({
                userId: '60b4c3e3c9e77c0015f2f4f4',
                name: 'New Record',
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
            });

            const res = await request(app)
                .delete(`/record/${record._id}`)
                .set('Authorization', token)
                .send({ userId });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Error deleting record');
        });

        it('should return 500 if an error occurs during record deletion', async () => {
            jest.spyOn(Record, 'findByIdAndDelete').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const res = await request(app)
                .delete('/record/60b4c3e3c9e77c0015f2f4f4')
                .set('Authorization', token)
                .send({ userId });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Error deleting record');

            jest.restoreAllMocks();
        });
    });

    describe('Public Records', () => {

        it('should return all public records', async () => {
            const res = await request(app)
                .get('/record/public')
                .set('Authorization', token);

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });

        it('should return 500 if an error occurs during fetching public records', async () => {
            jest.spyOn(Record, 'find').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const res = await request(app)
                .get('/record/public')
                .set('Authorization', token);

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Database error');

            jest.restoreAllMocks();
        });
    });

    describe('Favorite Records', () => {
        it('should return 400 when trying to like not public record', async () => {
            const record = await Record.create<Partial<IRecord>>({
                userId: userId.toString(),
                name: 'New Record',
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
            });

            const res = await request(app)
                .post(`/record/${record._id}/like`)
                .set('Authorization', token)
                .send({ userId });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('You can only like public records');
        });

        it('should return 400 when trying to like your own record', async () => {
            const record = await Record.create<Partial<IRecord>>({
                userId: userId.toString(),
                name: 'New Record',
                public: true,
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
            });

            const res = await request(app)
                .post(`/record/${record._id}/like`)
                .set('Authorization', token)
                .send({ userId });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('You cannot like your own record');
        });

        it('should return all favorite records', async () => {
            //like
            const userRes = await request(app)
                .post('/auth/register')
                .send({
                    userName: 'dana',
                    email: 'dana@example.com',
                    password: 'securePassword123',
                });

            const record = await Record.create<Partial<IRecord>>({
                userId: userRes.body.user._id,
                name: 'New Record',
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
                public: true,
            });

            const res = await request(app)
                .post(`/record/${record.id.toString()}/like`)
                .set('Authorization', token)
                .send({
                    userId,
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.favRecords).toContain(record.id.toString());


            //unlike
            const res2 = await request(app)
                .post(`/record/${record.id.toString()}/like`)
                .set('Authorization', token)
                .send({
                    userId,
                });
            expect(res2.statusCode).toBe(200);
            expect(res2.body.favRecords).not.toContain(record.id.toString());
        });

    });

    describe('Record Search', () => {
        it('should return all records', async () => {
            const res = await request(app)
                .get('/record')
                .set('Authorization', token);

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });

        it('should return 500 if an error occurs during fetching records', async () => {
            jest.spyOn(Record, 'find').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const res = await request(app)
                .get('/record')
                .set('Authorization', token);

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Database error');

            jest.restoreAllMocks();
        });

        it('should return a record by id', async () => {
            const record = await Record.create<Partial<IRecord>>({
                userId: userId.toString(),
                name: 'New Record',
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
            });

            const res = await request(app)
                .get(`/record/${record._id}`)
                .set('Authorization', token);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe('New Record');
        });

        it('should return 404 if record is not found by id', async () => {
            const res = await request(app)
                .get('/record/60b4c3e3c9e77c0015f2f4f5')
                .set('Authorization', token);

            expect(res.statusCode).toBe(200);
            expect(res.body).toBe(null);
        });

        it('should return 400 if an error occurs during fetching record by id', async () => {
            jest.spyOn(Record, 'findOne').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const res = await request(app)
                .get('/record/60b4c3e3c9e77c0015f2f4f4')
                .set('Authorization', token);

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Database error');

            jest.restoreAllMocks();
        });

        it('should return all records by user id', async () => {
            const res = await request(app)
                .get('/record')
                .set('Authorization', token)
                .send({ userId });

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });

        it('should return 400 if an error occurs during fetching records by user id', async () => {
            jest.spyOn(Record, 'find').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const res = await request(app)
                .get('/record')
                .set('Authorization', token)
                .send({ userId });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Database error');

            jest.restoreAllMocks();
        });

    });

    describe('Public Records Search', () => {
        it('should return all public records', async () => {
            const userRes = await request(app)
                .post('/auth/register')
                .send({
                    userName: 'dana',
                    email: 'dana@example.com',
                    password: 'securePassword123',
                });

            const record = await Record.create<Partial<IRecord>>({
                userId: userRes.body.user._id,
                name: 'New Record',
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
                public: true,
            });

            const res = await request(app)
                .get('/record/public')
                .set('Authorization', token);

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body[0]._id).toEqual(record.id.toString());
            expect(res.body[0].name).toEqual(record.name);
        });
    });


    // describe('Chunk Routes', () => {
    //
    //     describe('Chunk Creation', () => {
    //         it('should create a new chunk successfully', async () => {
    //             jest.spyOn(ChunkService, 'addChunk').mockImplementationOnce(() => {
    //                 return Promise.resolve({} as IChunkScheme);
    //             });
    //
    //             const record = await Record.create<Partial<IRecord>>({
    //                 userId: userId.toString(),
    //                 name: 'New Record',
    //                 location: {
    //                     type: 'Point',
    //                     coordinates: [40.7128, -74.0060],
    //                 },
    //             });
    //
    //             const res = await request(app)
    //                 .post(`/record/${record._id}/chunk`)
    //                 .set('Authorization', token)
    //                 .send({
    //                     userId,
    //                     startTime: new Date(),
    //                     endTime: new Date(),
    //                     status: 'not-started',
    //                     file: 'path/to/audio/file.mp3',
    //                 });
    //
    //             expect(res.statusCode).toBe(201);
    //         });
    //
    //         it('should return 400 if required fields are missing - name', async () => {
    //             const record = await Record.create<Partial<IRecord>>({
    //                 userId: userId.toString(),
    //                 name: 'New Record',
    //                 location: {
    //                     type: 'Point',
    //                     coordinates: [40.7128, -74.0060],
    //                 },
    //             });
    //
    //             const res = await request(app)
    //                 .post(`/record/${record._id}/chunk`)
    //                 .set('Authorization', token)
    //                 .send({
    //                     userId,
    //                     startTime: new Date(),
    //                     endTime: new Date(),
    //                     status: 'not-started',
    //                 });
    //
    //             expect(res.statusCode).toBe(400);
    //             expect(res.text).toBe('Audio file is required');
    //         });
    //     });
    //
    //     describe('Get Chunk By chunkId', () => {
    //         it('should return a chunk by id', async () => {
    //             jest.spyOn(ChunkService, 'addChunk').mockImplementationOnce(() => {
    //                 return Promise.resolve({} as IChunkScheme);
    //             });
    //
    //             jest.spyOn(Chunk, 'findById').mockImplementationOnce(() => {
    //                 return Promise.resolve({} as IChunkScheme);
    //             });
    //
    //             const record = await Record.create<Partial<IRecord>>({
    //                 userId: userId.toString(),
    //                 name: 'New Record',
    //                 location: {
    //                     type: 'Point',
    //                     coordinates: [40.7128, -74.0060],
    //                 },
    //             });
    //
    //             const res = await request(app)
    //                 .post(`/record/${record._id}/chunk`)
    //                 .set('Authorization', token)
    //                 .send({
    //                     userId,
    //                     startTime: new Date(),
    //                     endTime: new Date(),
    //                     status: 'not-started',
    //                     file: 'path/to/audio/file.mp3',
    //                 });
    //
    //             const res2 = await request(app)
    //                 .get(`/record/${record._id}/chunk/chunkId`)
    //                 .set('Authorization', token);
    //
    //             expect(res2.statusCode).toBe(200);
    //             expect(res2.body._id).toBe(chunkId);
    //         });
    //
    //         it('should return 404 if chunk is not found by id', async () => {
    //             const record = await Record.create<Partial<IRecord>>({
    //                 userId: userId.toString(),
    //                 name: 'New Record',
    //                 location: {
    //                     type: 'Point',
    //                     coordinates: [40.7128, -74.0060],
    //                 },
    //             });
    //
    //             const res = await request(app)
    //                 .get(`/record/${record._id}/chunk/60b4c3e3c9e77c0015f2f4f4`)
    //                 .set('Authorization', token);
    //
    //             expect(res.statusCode).toBe(404);
    //             expect(res.text).toBe('Chunk not found');
    //         });
    //
    //         it('should return 500 if an error occurs during fetching chunk by id', async () => {
    //             jest.spyOn(Record, 'findById').mockImplementationOnce(() => {
    //                 throw new Error('Database error');
    //             });
    //
    //             const record = await Record.create<Partial<IRecord>>({
    //                 userId: userId.toString(),
    //                 name: 'New Record',
    //                 location: {
    //                     type: 'Point',
    //                     coordinates: [40.7128, -74.0060],
    //                 },
    //             });
    //
    //             const res = await request(app)
    //                 .get(`/record/${record._id}/chunk/60b4c3e3c9e77c0015f2f4f4`)
    //                 .set('Authorization', token);
    //     });
    //
    // });
    //
    //     describe('Get All Chunks By recordId', () => {});
    //
    // });
});
