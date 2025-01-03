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
            const chunk = ChunkService.addChunk(recordId, chunkData, audioFilePath);
            res.status(201).json(chunk);
        } catch (err: any) {
            next(err);
        }
    },

    async updateChunk (req: Request, res: Response, next: NextFunction) {
        try {
            const updatedChunk = await ChunkService.updateChunk(req.params.id, req.body);
            if (!updatedChunk) {
                return res.status(404).json({ message: 'Chunk not found' });
            }
            res.json(updatedChunk);
        } catch (err: any) {
            next(err);
        }
    },

    async deleteChunk (req: Request, res: Response, next: NextFunction) {
        try {
            const deletedChunk = await ChunkService.deleteChunk(req.params.id);
            if (!deletedChunk) {
                return res.status(404).json({ message: 'Chunk not found' });
            }
            res.json({ message: 'Chunk deleted successfully' });
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
    }
}