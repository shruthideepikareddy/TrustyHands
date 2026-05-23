import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Feedback from "../models/Feedback.js";
import Message from "../models/Message.js";

export const getAdminStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments({ role: "customer" });
    const workersCount = await User.countDocuments({
      role: "worker",
      "workerDetails.status": "approved",
    });
    const pendingWorkersCount = await User.countDocuments({
      role: "worker",
      "workerDetails.status": "pending",
    });
    const bookingsCount = await Booking.countDocuments();

    return res
      .status(200)
      .json({ usersCount, workersCount, pendingWorkersCount, bookingsCount });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customerId", "fullName email")
      .populate("workerId", "fullName email")
      .sort({ createdAt: -1 });
    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("customerId", "fullName")
      .populate("workerId", "fullName")
      .sort({ createdAt: -1 });
    return res.status(200).json({ feedback });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isSuspended, reason } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { isSuspended, suspensionReason: reason },
      { new: true },
    );
    return res.status(200).json({
      message: `User ${isSuspended ? "suspended" : "unsuspended"}`,
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ... existing controllers ...
export const getPendingWorkers = async (req, res) => {
  try {
    const pending = await User.find({
      role: "worker",
      "workerDetails.status": "pending",
    });
    return res
      .status(200)
      .json({ success: true, message: "Pending workers fetched", pending });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "customer" }).select("-password");
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: "worker" }).select("-password");
    return res.status(200).json({ success: true, workers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateWorkerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }
    const worker = await User.findOne({ _id: id, role: "worker" });
    if (!worker)
      return res
        .status(404)
        .json({ success: false, message: "Worker not found" });
    worker.workerDetails.status = status;
    worker.markModified("workerDetails");
    await worker.save();
    return res
      .status(200)
      .json({ success: true, message: "Status updated", worker });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
