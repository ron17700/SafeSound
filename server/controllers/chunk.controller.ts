import { Request, Response } from 'express';
import { ChunkService } from '../services/chunk.service';

export const ChunkController  = {
    async addChunk (req: Request, res: Response) {
        try {
            const recordId = req.params.id;
            const chunkData = req.body;
            const audioFile: Buffer | undefined = req.file?.buffer;
            if (!audioFile) {
                throw new Error('Audio file is required');
            }
            await ChunkService.addChunk(recordId, chunkData, audioFile);
            res.status(201);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    },

    async updateChunk (req: Request, res: Response) {
        try {
            const updatedChunk = await ChunkService.updateChunk(req.params.id, req.body);
            if (!updatedChunk) {
                return res.status(404).json({ message: 'Chunk not found' });
            }
            res.json(updatedChunk);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    },

    async deleteChunk (req: Request, res: Response) {
        try {
            const deletedChunk = await ChunkService.deleteChunk(req.params.id);
            if (!deletedChunk) {
                return res.status(404).json({ message: 'Chunk not found' });
            }
            res.json({ message: 'Chunk deleted successfully' });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async getChunk (req: Request, res: Response) {
        try {
            const chunk = await ChunkService.getChunk(req.params.id);
            if (!chunk) {
                return res.status(404).json({ message: 'Chunk not found' });
            }
            res.json(chunk);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAllChunks (req: Request, res: Response) {
        try {
            const recordId = req.params.recordId;
            const chunks = await ChunkService.getAllChunks(recordId);
            res.json(chunks);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}
