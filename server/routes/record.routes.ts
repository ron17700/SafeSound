import { Router } from 'express';
import { ChunkController } from '../controllers/chunk.controller';
import {Chunk} from "../models/chuck.model";
import {RecordController} from "../controllers/record.controller";

const router = Router();

router.get('/getAllRecords/:userId', RecordController.getAllRecordsById);//
router.get('/getRecord/:id', RecordController.getRecord);//
router.post('/create', RecordController.addRecord);//
router.put('/:id', RecordController.updateRecord);
router.delete('/delete/:id', RecordController.deleteRecord);//

router.get('/record/:id/getAllChunks', RecordController.getAllChunks);//
router.get('/record/:id/chunk/:chunkId', RecordController.getChunk);//
router.post('/record/:id/chunk', ChunkController.addChunk);//

export default router;
