import { Router } from 'express';
import { RecordController } from '../controllers/record.controller';

const router = Router();

router.get('/record', RecordController.getRecords);
router.post('/record', RecordController.addRecord);
router.put('/record/:id', RecordController.updateRecord);
router.delete('/record/:id', RecordController.deleteRecord);

export default router;
