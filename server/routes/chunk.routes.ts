import { Router } from 'express';
import { ChunkController } from '../controllers/chunk.controller';

const router = Router();

router.get('/:recordId', ChunkController.getAllChunks);
router.get('/:id', ChunkController.getChunk);
router.post('/:recordId', ChunkController.addChunk);

export default router;
