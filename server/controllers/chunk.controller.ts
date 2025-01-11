import {NextFunction, Request, Response} from 'express';
import { ChunkService } from '../services/chunk.service';

export const ChunkController  = {
    async addChunk (req: Request, res: Response, next: NextFunction) {
        try {
            const recordId = req.params.recordId;
            const chunkData = req.body;
            const audioFilePath: string = req.body.file;
            if (!audioFilePath) {
                throw new Error('Audio file is required');
            }
            const chunk = await ChunkService.addChunk(recordId, chunkData, audioFilePath);
            res.status(201).json(chunk);
        } catch (err: any) {
            next(err);
        }
    },

    async getChunk (req: Request, res: Response, next: NextFunction) {
        try {
            const chunk = await ChunkService.getChunk(req.params.id);
            if (!chunk) {
                return res.status(404).json({ message: 'Chunk not found' });
            }
            res.json(chunk);
        } catch (err: any) {
            next(err);
        }
    },

    async getAllChunks (req: Request, res: Response, next: NextFunction) {
        try {
            const recordId = req.params.recordId;
            const chunks = await ChunkService.getAllChunks(recordId);
            const chunksWithNames = chunks?.map((chunk, index) => ({
                ...chunk.toObject(),
                name: `#${index + 1}`
            }));
            res.json(chunksWithNames);
        } catch (err: any) {
            next(err);
        }
    },

    async addCommentToChunk (req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, comment } = req.body;
            const recordId = req.params.recordId;
            const chunkId = req.params.id;
            const updatedChunk = await ChunkService.addCommentToChunk(userId, recordId, chunkId, comment);
            res.json(updatedChunk);
        } catch (err: any) {
            next(err);
        }
    }
}
