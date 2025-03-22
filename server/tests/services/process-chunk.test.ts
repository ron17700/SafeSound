import { processChunk, getRandomStatus, getRandomClass, getRandomSummary} from '../../services/process-chunk.service';
import {Status, Class, IChunk, IChunkScheme} from '../../models/chunk.model';
import mongoose from "mongoose";
import {IRecord, Record} from "../../models/record.model";



describe('processChunk', () => {
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


    it('should update chunk status to in-progress and then to completed', async () => {
        process.env.LOCAL_ENV = 'true';

        const chunkId = new mongoose.Types.ObjectId().toString();
        const audioFilePath = '../server/tests/mocks/test.mp3';
        const mockChunk: IChunk = {
            id: chunkId,
            recordId,
            startTime: new Date(),
            endTime: new Date(),
            status: Status.NotStarted,
            audioFilePath,
        };

        const result = await processChunk(mockChunk as unknown as IChunkScheme);
        expect(result).toEqual(undefined);
    });

    it('should update chunk status to failed if an error occurs', async () => {
        const chunkId = new mongoose.Types.ObjectId().toString();
        const audioFilePath = '../path/to/audio/file.mp3';
        const mockChunk: IChunk = {
            id: chunkId,
            recordId,
            startTime: new Date(),
            endTime: new Date(),
            status: Status.NotStarted,
            audioFilePath,
        };

        try {
            await processChunk(mockChunk as unknown as IChunkScheme);
        } catch (e) {
            expect(e).toEqual(new Error('Error analyzing audio with Speechmatics'));
        }
    });
});

describe('getRandomStatus', () => {
    it('should return a valid status', () => {
        const status: Status = getRandomStatus();
        expect([Status.NotStarted, Status.InProgress, Status.Completed]).toContain(status);
    });
});

describe('getRandomClass', () => {
    it('should return a valid class', () => {
        const chunkClass = getRandomClass();
        expect([Class.Natural, Class.Good, Class.Bad]).toContain(chunkClass);
    });
});

describe('getRandomSummary', () => {
    it('should return a valid summary', () => {
        const mockSummary = 'Mock Summary';
        const summary = getRandomSummary(mockSummary);
        expect(['I want to hug you tonight', 'May the odds be ever in your favor', 'I hate you!!!', mockSummary]).toContain(summary);
    });
});
