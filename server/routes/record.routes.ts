import { Router } from 'express';
import {RecordController} from "../controllers/record.controller";

const router = Router();

router.get('/:userId', RecordController.getAllRecordsById);
router.get('/:id', RecordController.getRecord);
router.post('/', RecordController.addRecord);
router.put('/:id', RecordController.updateRecord);
router.delete('/:id', RecordController.deleteRecord);

export default router;
