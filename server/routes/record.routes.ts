import { Router } from 'express';
import {RecordController} from "../controllers/record.controller";
import { uploadController } from "../controllers/upload.controller";
import {isAuthorized} from "../middlewares/authorization";

const router = Router();

router.get('/:userId', [isAuthorized, RecordController.getAllRecordsById]);
router.get('/:id', [isAuthorized, RecordController.getRecord]);
router.post('/', [isAuthorized, uploadController.upload, uploadController.verifyUpload, RecordController.addRecord]);
router.put('/:id', [isAuthorized, uploadController.upload, uploadController.verifyUpload, RecordController.updateRecord]);
router.delete('/:id', [isAuthorized, RecordController.deleteRecord]);

export default router;
