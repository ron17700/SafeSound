import { Router } from 'express';
import {RecordController} from "../controllers/record.controller";
import { uploadController } from "../controllers/upload.controller";
import {isAuthorized} from "../middlewares/authorization";
import {ChunkController} from "../controllers/chunk.controller";

const router = Router();

router.post('/', [isAuthorized, uploadController.upload, uploadController.verifyUpload, isAuthorized, RecordController.addRecord]);
router.post('/:id/like', [isAuthorized, RecordController.addRecordToFavorite]);
router.put('/:id', [isAuthorized, uploadController.upload, uploadController.verifyUpload, isAuthorized, RecordController.updateRecord]);
router.delete('/:id', [isAuthorized, RecordController.deleteRecord]);
router.get('/public', [isAuthorized, RecordController.getAllPublicRecords]);
router.get('/', [isAuthorized, RecordController.getAllRecordsById]);
router.get('/:id', [isAuthorized, RecordController.getRecord]);

router.get('/:recordId/chunk', [isAuthorized, ChunkController.getAllChunks]);
router.get('/:recordId/chunk/:id', [isAuthorized, ChunkController.getChunk]);
router.post('/:recordId/chunk', [isAuthorized, uploadController.upload, uploadController.verifyUpload, isAuthorized, ChunkController.addChunk]);

router.post('/:recordId/chunk/:id/comment', [isAuthorized, ChunkController.addCommentToChunk]);
export default router;