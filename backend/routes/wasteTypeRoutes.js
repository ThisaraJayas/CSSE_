import express from 'express';
import { createWasteType, getWasteTypeById, getWasteTypes } from '../controllers/WasteTypeController.js';
const router = express.Router();

router.get('/waste-types', getWasteTypes);
router.get('/waste-types/:id', getWasteTypeById);
router.post('/add-waste-type', createWasteType);


export default router;