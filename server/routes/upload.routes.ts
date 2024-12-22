import { Router } from 'express';
import { uploadController } from "../controllers/upload.controller";
import { RecordController } from "../controllers/record.controller";
const router = Router();

router.post('/file/:id', uploadController.upload, uploadController.verifyUpload, RecordController.updateRecord);

export default router;
