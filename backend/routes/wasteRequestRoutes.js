import express from 'express';
import { createWasteRequest, getAllWasteRequests, getWasteRequestsByUser, updateWasteRequestStatus } from '../controllers/WasteRequestController.js';
const router = express.Router();

router.post('/postwasterequest', createWasteRequest);

router.get('/waste-requests/user/:userId', getWasteRequestsByUser);
router.get('/waste-requests', getAllWasteRequests); // Endpoint to get all waste requests
router.put('/waste-requests/:requestId', updateWasteRequestStatus); 

export default router;