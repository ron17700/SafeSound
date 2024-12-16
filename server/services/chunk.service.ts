import {Chunk, IChunk, IChunkScheme, Status} from '../models/chuck.model';
import fs from 'fs';
import path from 'path';
import { TaskQueue } from './task.queue';
const taskQueue = new TaskQueue();

export const ChunkService = {
    async addChunk(recordId: string, chunkData: IChunk, audioFile: Buffer) {
        const audioFilePath = path.join(__dirname, '..', 'uploads', `${chunkData.chunkId}.mp3`);
        fs.writeFileSync(audioFilePath, audioFile);

        const newChunk = new Chunk({
            recordId: recordId,
            chunkId: chunkData.chunkId,
            startTime: chunkData.startTime,
            endTime: chunkData.endTime,
            status: Status.NotStarted,
            chunkTimeStamp: [],
            audioFilePath: audioFilePath
        });

        try {
            const result: IChunkScheme = await newChunk.save();

            // Add task to queue
            taskQueue.addTask(result);
        } catch (error) {
            console.error('Error adding chunk', error);
            throw new Error('Error adding chunk');
        }
    },

    async updateChunk(id: string, chunkData: Partial<IChunkScheme>) {
        return Chunk.findByIdAndUpdate(id, chunkData);
    },

    async deleteChunk(id: string): Promise<IChunkScheme | null> {
        try {
            return await Chunk.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting chunk', error);
            throw new Error('Error deleting chunk');
        }
    }
}
