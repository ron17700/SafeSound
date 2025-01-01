import { Router } from 'express';
import { ChunkController } from '../controllers/chunk.controller';
import {isAuthorized} from "../middlewares/authorization";
import {uploadController} from "../controllers/upload.controller";

const router = Router();

router.post('/:recordId', [isAuthorized, uploadController.upload, uploadController.verifyUpload, isAuthorized, ChunkController.addChunk]);
router.get('/:recordId', [isAuthorized, ChunkController.getAllChunks]);

export default router;
