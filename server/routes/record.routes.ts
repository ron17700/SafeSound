import { Router } from 'express';
import {RecordController} from "../controllers/record.controller";
import { uploadController } from "../controllers/upload.controller";
import {isAuthorized} from "../middlewares/authorization";

const router = Router();

router.post('/', [isAuthorized, uploadController.upload, uploadController.verifyUpload, isAuthorized, RecordController.addRecord]);
router.put('/:id', [isAuthorized, uploadController.upload, uploadController.verifyUpload, isAuthorized, RecordController.updateRecord]);
router.delete('/:id', [isAuthorized, RecordController.deleteRecord]);
router.get('/', [isAuthorized, RecordController.getAllRecordsById]);
router.get('/:id', [isAuthorized, RecordController.getRecord]);

export default router;
