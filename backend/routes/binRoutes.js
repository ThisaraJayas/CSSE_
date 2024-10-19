import express from "express";
import {
  addBin,
  verifyBin,
  getUserBins,
  GetBinByUserId,
  getAllBins,
  addWeight,
} from "../controllers/binController.js";

const router = express.Router();

// Protect the routes with the authentication middleware
router.post("/bins", addBin);
router.get("/binsByUserId/:userId", GetBinByUserId);
router.get("/bins/:userId", getUserBins);
router.get("/bins", getAllBins);
router.put("/bins/:binId/weight", addWeight);
router.put("/bins/:binId", verifyBin);

export default router;