import express from "express";
const router = express.Router();

import { 
  getPendingWorkers, 
  updateWorkerStatus, 
  getAllUsers, 
  getAllWorkers, 
  getAdminStats, 
  getAllBookings, 
  getAllFeedback, 
  suspendUser 
} from "../controllers/adminController.js";

router.get("/stats", getAdminStats);
router.get("/workers/pending", getPendingWorkers);
router.get("/users", getAllUsers);
router.get("/workers", getAllWorkers);
router.put("/workers/:id/status", updateWorkerStatus);
router.get("/bookings", getAllBookings);
router.get("/feedback", getAllFeedback);
router.put("/users/:id/suspend", suspendUser);

export default router;

