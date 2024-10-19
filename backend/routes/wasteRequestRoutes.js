import express from 'express';
import { createWasteRequest, getWasteRequestsByUser } from '../controllers/WasteRequestController.js';
const router = express.Router();

router.post('/postwasterequest', createWasteRequest);

router.get('/waste-requests/user/:userId', getWasteRequestsByUser);

export default router;