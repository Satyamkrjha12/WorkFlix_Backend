const Gig = require("../models/Gig.model");
const UserModel = require("../models/User.model");

/* ================= CREATE GIG ================= */
exports.createGig = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      minBudget,
      maxBudget,
      duration,
      skills,
      status,
    } = req.body;

    if (!title || !description || !minBudget || !maxBudget || !skills?.length) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const user = UserModel.findById()

    const gig = await Gig.create({
      title,
      description,
      category,
      minBudget,
      maxBudget,
      duration,
      skills,
      status: status || "draft",
      postedBy: req.user.id, 
    });

    res.status(201).json({
      message: "Gig created successfully",
      gig,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create gig",
    });
  }
};

/* ================= GET ALL PUBLISHED GIGS ================= */
exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ status: "published" })
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gigs",
    });
  }
};

/* ================= GET SINGLE GIG ================= */
exports.getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "postedBy",
      "name email role"
    );

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gig",
    });
  }
};

/* ================= GET MY GIGS (CLIENT) ================= */
exports.getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ postedBy: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your gigs",
    });
  }
};

/* ================= UPDATE GIG ================= */
exports.updateGig = async (req, res) => {
  try {
    const gig = await Gig.findOne({
      _id: req.params.id,
      postedBy: req.user.id,
    });

    if (!gig) {
      return res.status(403).json({
        message: "Not authorized to update this gig",
      });
    }

    Object.assign(gig, req.body);
    await gig.save();

    res.json({
      message: "Gig updated successfully",
      gig,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update gig",
    });
  }
};

/* ================= DELETE GIG ================= */
exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findOneAndDelete({
      _id: req.params.id,
      postedBy: req.user.id,
    });

    if (!gig) {
      return res.status(403).json({
        message: "Not authorized to delete this gig",
      });
    }

    res.json({
      message: "Gig deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete gig",
    });
  }
};
