import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Feedback from "../models/Feedback.js";

// ... previous code ...

export const submitFeedback = async (req, res) => {
  try {
    const { bookingId, customerId, workerId, rating, comment } = req.body;
    
    if (!bookingId || !customerId || !workerId || !rating || !comment) {
      return res.status(400).json({ message: "Missing feedback data" });
    }

    const feedback = await Feedback.create({ bookingId, customerId, workerId, rating, comment });
    await Booking.findByIdAndUpdate(bookingId, { hasFeedback: true });

    return res.status(201).json({ message: "Feedback submitted!", data: feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error submitting feedback" });
  }
};


// Create a new booking request
export const createBooking = async (req, res) => {
  try {
    const { customerId, workerId, service, date, time, address, description, proposedPrice } = req.body;
    
    if (!customerId || !workerId || !service || !date || !time || !address || !proposedPrice) {
      return res.status(400).json({ message: "All required fields must be provided (including estimated price)" });
    }

    const newBooking = await Booking.create({
      customerId,
      workerId,
      service,
      date,
      time,
      address,
      description,
      proposedPrice
    });

    return res.status(201).json({ message: "Booking requested successfully", data: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating booking request" });
  }
};

// Get all bookings for a specific customer
export const getCustomerBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.find({ customerId: id })
      .populate("workerId", "fullName email phone workerDetails.skill")
      .sort({ createdAt: -1 });
    
    return res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching customer bookings" });
  }
};

// Get all pending and active bookings for a specific worker
export const getWorkerBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.find({ workerId: id })
      .populate("customerId", "fullName email phone")
      .sort({ createdAt: -1 });
    
    return res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching worker bookings" });
  }
};

// Update the status of a booking (Accept/Reject/Complete)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, proposedPrice, workerNote, customerNote, finalPrice } = req.body;
    
    const validStatuses = ["pending", "accepted", "rejected", "completed", "cancelled", "disputed"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (proposedPrice !== undefined) updateData.proposedPrice = proposedPrice;
    if (workerNote !== undefined) updateData.workerNote = workerNote;
    if (customerNote !== undefined) updateData.customerNote = customerNote;
    if (finalPrice !== undefined) updateData.finalPrice = finalPrice;

    const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!booking) {
      return res.status(404).json({ message: "Booking record not found" });
    }

    return res.status(200).json({ message: `Booking updated successfully`, data: booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating booking" });
  }
};

