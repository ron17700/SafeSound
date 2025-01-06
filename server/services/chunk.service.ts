import {Chunk, IChunk, IChunkScheme, Status} from '../models/chunk.model';
import {taskQueue} from "../index";

export const ChunkService = {
    async addChunk(recordId: string, chunkData: IChunk, audioFilePath: string) {
        const newChunk = new Chunk({
            recordId: recordId,
            startTime: chunkData.startTime,
            endTime: chunkData.endTime,
            status: Status.NotStarted,
            audioFilePath: audioFilePath
        });

        try {
            const result: IChunkScheme = await newChunk.save();

            // Add task to queue
            taskQueue.addTask(result);
            return result;
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
    },

    async getChunk(id: string): Promise<IChunkScheme | null> {
        try {
            return await Chunk.findById(id);
        } catch (error) {
            console.error('Error getting chunk', error);
            throw new Error('Error getting chunk');
        }
    },

    async getAllChunks(recordId: string): Promise<IChunkScheme[] | null> {
        try {
            return await Chunk.find({ recordId }).sort({ timeStamp: 1 }).exec();
        } catch (error) {
            console.error('Error getting chunk', error);
            throw new Error('Error deleting chunk');
        }
    },
}
