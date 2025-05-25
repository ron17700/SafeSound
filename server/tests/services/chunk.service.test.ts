import {ChunkService} from '../../services/chunk.service';
import {Chunk, IChunk, Status} from '../../models/chunk.model';
import {IRecord, Record} from '../../models/record.model';
import mongoose from 'mongoose';

describe('ChunkService', () => {
    let recordId: string;
    let userId: string;

    beforeAll(async () => {
        userId = new mongoose.Types.ObjectId().toString();
        const record = await Record.create<Partial<IRecord>>({
            userId: new mongoose.Types.ObjectId().toString(),
            name: 'Test Record',
            location: {
                type: 'Point',
                coordinates: [40.7128, -74.0060],
            },
        });
        recordId = record.id.toString();
    });

    afterAll(async () => {
        await Record.deleteMany({});
        await Chunk.deleteMany({});
    });

    describe('addChunk', () => {
        it('should add a new chunk', async () => {
            const chunkId = new mongoose.Types.ObjectId().toString();
            const audioFilePath = 'path/to/audio/file.mp3';
            const chunkData: IChunk = {
                id: chunkId,
                recordId,
                startTime: new Date(),
                endTime: new Date(),
                status: Status.NotStarted,
                audioFilePath,
            };

            const chunk = await ChunkService.addChunk(userId, recordId, chunkData, audioFilePath);

            expect(chunk).toHaveProperty('_id');
            expect(chunk.recordId.toString()).toBe(recordId);
        });
    });

    describe('getChunk', () => {
        it('should get a chunk by id', async () => {
            const chunk = await Chunk.create({
                recordId,
                startTime: new Date(),
                endTime: new Date(),
                status: Status.NotStarted,
                audioFilePath: 'path/to/audio/file.mp3',
            });
            const res = await ChunkService.getChunk(chunk.id);

            expect(res).toHaveProperty('_id');
            expect(res?.id.toString()).toBe(chunk.id);
        });

        it('should return null if chunk is not found', async () => {
            const chunk = await ChunkService.getChunk('6784201f9ffb01bca4c9c249');

            expect(chunk).toBeNull();
        });
    });

    describe('deleteChunk', () => {
        it('should deleteChunk a chunk by id', async () => {
            const chunk = await Chunk.create({
                recordId,
                startTime: new Date(),
                endTime: new Date(),
                status: Status.NotStarted,
                audioFilePath: 'path/to/audio/file.mp3',
            });
            const res = await ChunkService.deleteChunk(chunk.id);

            expect(res).toHaveProperty('_id');
            expect(res?.id.toString()).toBe(chunk.id);
        });

        it('should return null if chunk is not found', async () => {
            const chunk = await ChunkService.deleteChunk('6784201f9ffb01bca4c9c249');

            expect(chunk).toBeNull();
        });

        it('should return null if chunk is not found - error', async () => {
            try {
                await ChunkService.deleteChunk('');
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });

    describe('getAllChunks', () => {
        it('should get all chunks for a record', async () => {
            const chunks = await ChunkService.getAllChunks(recordId);

            expect(chunks).toBeInstanceOf(Array);
        });

        it('should return an empty array if no chunks are found', async () => {
            const chunks = await ChunkService.getAllChunks('nonexistentRecordId');

            expect(chunks).toBeInstanceOf(Array);
            expect(chunks?.length).toBe(0);
        });
    });

    describe('addCommentToChunk', () => {
        it('should add a comment to a chunk', async () => {
            const record = await Record.create<Partial<IRecord>>({
                userId: new mongoose.Types.ObjectId().toString(),
                name: 'Test Record',
                location: {
                    type: 'Point',
                    coordinates: [40.7128, -74.0060],
                },
                public: true,
            });

            const comment = 'Test comment';
            const chunk = await Chunk.create({
                recordId: record.id,
                startTime: new Date(),
                endTime: new Date(),
                status: Status.NotStarted,
                audioFilePath: 'path/to/audio/file.mp3',
            });

            const res = await ChunkService.addCommentToChunk(userId, record.id, chunk.id, comment);

            expect(res).toHaveProperty('numberOfComments');
            expect(res?.numberOfComments).toBeGreaterThan(0);
        });

        it('should throw an error if chunk is not found', async () => {
            const comment = 'Test comment';

            await expect(ChunkService.addCommentToChunk(userId, recordId, 'chunkId', comment)).rejects.toThrow();
        });
    });
});
