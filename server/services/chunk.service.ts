import {Chunk, IChunk, IChunkScheme, Status} from '../models/chunk.model';
import {taskQueue} from "../index";
import Message, {IMessage} from "../models/message.model";
import {IRecord, Record} from "../models/record.model";

export const ChunkService = {
    async addChunk(recordId: string, chunkData: IChunk, audioFilePath: String) {
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
            return await Chunk.findById(id)
                .populate({
                    path: 'messages',
                    populate: {
                        path: 'sender',
                        select: 'userName profileImage',
                    },
                })
                .exec();
        } catch (error) {
            console.error('Error getting chunk', error);
            throw new Error('Error deleting chunk');
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

    async addCommentToChunk(userId: string, recordId: string, chunkId: string, comment: string): Promise<IChunkScheme | null> {
        const existingChunk: IChunkScheme | null = await Chunk.findById(chunkId).exec();
        if (!existingChunk) {
            throw new Error('Chunk not found!');
        }
        const existingRecord: IRecord | null = await Record.findById(existingChunk.recordId).exec();
        if (!existingRecord) {
            throw new Error('Record not found!');
        }
        if (existingRecord._id != recordId) {
            throw new Error('Chunk is not associated with the record!')
        }

        if (existingRecord.public !== true) {
            throw new Error('Unauthorized!');
        }

        const newMessage = new Message({
            sender: userId,
            content: comment,
        });
        const savedMessage = await newMessage.save();
        existingChunk.messages.push(<IMessage>savedMessage._id);
        existingChunk.numberOfComments +=1;
        existingRecord.numberOfComments+=1;
        await existingRecord.save();
        return await existingChunk.save();
    },
}
