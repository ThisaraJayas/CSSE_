import express from 'express';
import { createRefund, getAllRefunds, updateRefundStatus } from '../controllers/RefundController.js';
const router = express.Router();

router.post('/refund', createRefund);
router.get('/refunds', getAllRefunds);
router.put('/refund/:id', updateRefundStatus);


export default router;