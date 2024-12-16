import { Request, Response } from 'express';
import { ChunkService } from '../services/chunk.service';
import { RecordService } from "../services/record.service";

export const ChunkController  = {
    async addChunk (req: Request, res: Response) {
        try {
            const recordId = req.params.id;
            const chunkData = req.body;
            const audioFile: Buffer | undefined = req.file?.buffer;
            if (!audioFile) {
                throw new Error('Audio file is required');
            }
            const newChunk = await ChunkService.addChunk(recordId, chunkData, audioFile);
            res.status(201).json(newChunk);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}
