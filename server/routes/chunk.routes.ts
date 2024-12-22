import { Router } from 'express';
import { ChunkController } from '../controllers/chunk.controller';
import {isAuthorized} from "../middlewares/authorization";
import {uploadController} from "../controllers/upload.controller";

const router = Router();

router.post('/:recordId', [isAuthorized, uploadController.upload, uploadController.verifyUpload, ChunkController.addChunk]);
router.get('/:recordId', [isAuthorized, ChunkController.getAllChunks]);
router.get('/:id', [isAuthorized, ChunkController.getChunk]);

export default router;
