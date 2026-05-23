import express from "express";
import { 
  createBooking, 
  getCustomerBookings, 
  getWorkerBookings, 
  updateBookingStatus,
  submitFeedback
} from "../controllers/bookingController.js";

const router = express.Router();

// Customer creates a booking
router.post("/", createBooking);

// Get bookings for a specific customer
router.get("/customer/:id", getCustomerBookings);

// Get bookings for a specific worker
router.get("/worker/:id", getWorkerBookings);

// Worker or customer updates booking status (accept, reject, complete, cancel)
router.put("/:id/status", updateBookingStatus);

// Customer submits feedback
router.post("/feedback", submitFeedback);


export default router;
