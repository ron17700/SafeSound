import { Router } from 'express';
import {RecordController} from "../controllers/record.controller";
import { uploadController } from "../controllers/upload.controller";

const router = Router();

router.get('/:userId', RecordController.getAllRecordsById);
router.get('/:id', RecordController.getRecord);
router.post('/', [uploadController.upload, uploadController.verifyUpload, RecordController.addRecord]);
router.put('/:id', [uploadController.upload, uploadController.verifyUpload, RecordController.updateRecord]);
router.delete('/:id', RecordController.deleteRecord);

export default router;
