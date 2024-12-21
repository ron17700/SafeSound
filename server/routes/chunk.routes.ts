import { Router } from 'express';
import { ChunkController } from '../controllers/chunk.controller';
import {isAuthorized} from "../middlewares/authorization";

const router = Router();

router.get('/:recordId', [isAuthorized, ChunkController.getAllChunks]);
router.get('/:id', [isAuthorized, ChunkController.getChunk]);
router.post('/:recordId', [isAuthorized, ChunkController.addChunk]);

export default router;
