const mongoose = require("mongoose");
const Proposal = require("../models/Proposal.model");


exports.createProposal = async (req, res) => {
  try {
    const { amount, duration, coverLetter, gigId } = req.body;

    // ✅ Basic Validation
    if (!amount || !duration || !coverLetter || !gigId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(gigId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gig ID",
      });
    }

    // ✅ Prevent duplicate proposal (1 user → 1 gig)
    const existingProposal = await Proposal.findOne({
      userId: req.user.id,
      gigId,
    });

    if (existingProposal) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a proposal for this gig",
      });
    }

    // ✅ Create Proposal
    const proposal = await Proposal.create({
      userId: req.user.id,
      gigId,
      bid: amount,
      deliveryTime: duration,
      coverLetter,
    });

    return res.status(201).json({
      success: true,
      message: "Proposal submitted successfully",
      data: proposal,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create proposal",
      error: error.message,
    });
  }
};

// ✅ Get All Proposals (Logged-in User)
exports.getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("gigId")
      .lean();

    return res.status(200).json({
      success: true,
      count: proposals.length,
      data: proposals,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch proposals",
      error: error.message,
    });
  }
};

exports.getAllProposalsClient = async (req, res) => {
  try {
    const proposals = await Proposal.find({ gigId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("userId")
      .lean();

    return res.status(200).json({
      success: true,
      count: proposals.length,
      data: proposals,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch proposals",
      error: error.message,
    });
  }
}

// ✅ Get Single Proposal
exports.getProposal = async (req, res) => {
  try {
    const { id: proposalId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(proposalId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid proposal ID",
      });
    }

    const proposal = await Proposal.findOne({
      _id: proposalId,
      userId: req.user.id,
    })
      .populate("gigId", "title price")
      .lean();

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: proposal,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch proposal",
      error: error.message,
    });
  }
};

// ✅ Update Proposal
exports.updateProposal = async (req, res) => {
  try {
    const { id, bid, deliveryTime, coverLetter, isActive } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid proposal ID",
      });
    }

    // Ensure proposal belongs to user
    const existingProposal = await Proposal.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!existingProposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found or unauthorized",
      });
    }

    const updatedProposal = await Proposal.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(bid !== undefined && { bid }),
          ...(deliveryTime !== undefined && { deliveryTime }),
          ...(coverLetter !== undefined && { coverLetter }),
          ...(isActive !== undefined && { isActive }),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("gigId")
      ;

    return res.status(200).json({
      success: true,
      message: "Proposal updated successfully",
      data: updatedProposal,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update proposal",
      error: error.message,
    });
  }
};