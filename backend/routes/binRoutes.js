import express from 'express';
import {
  addBin,
  verifyBin,
  getUserBins,
  getAllBins,
  getBinById,
} from '../controllers/binController.js';

const router = express.Router();

// Protect the routes with the authentication middleware
router.post('/bins', addBin);
router.get('/bins/:userId', getUserBins);
router.get('/bins', getAllBins);
router.put('/bins/:binId', verifyBin);
router.get('/bins/:binId', getBinById);

export default router;
