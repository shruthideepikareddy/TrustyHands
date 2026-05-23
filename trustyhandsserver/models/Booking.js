import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    proposedPrice: { type: Number }, // Proposed by worker
    finalPrice: { type: Number },    // Mutually agreed price
    workerNote: { type: String },    // Note for customer
    customerNote: { type: String },  // Note for worker
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled", "disputed"],
      default: "pending",
    },
    hasFeedback: { type: Boolean, default: false },
  },
  { timestamps: true }
);


export default mongoose.model("Booking", bookingSchema);
