const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
      index: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    bid: {
      type: Number,
      required: true,
      min: [0, "Bid amount cannot be negative"]
    },

    deliveryTime: {
      type: Number,
      required: true,
      min: [1, "Delivery time must be at least 1 day"]
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Cover letter cannot exceed 1000 characters"]
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Proposal", ProposalSchema);