const express = require("express");
const router = express.Router();

const {
  createGig,
  getAllGigs,
  getGigById,
  getMyGigs,
  updateGig,
  deleteGig,
} = require("../controllers/gig.controller");

const auth = require("../middleware/auth.middleware");

/* ================= PUBLIC ROUTES ================= */

// Get all published gigs (freelancers browse)
router.get("/", getAllGigs);

// Get single gig details
router.get("/:id", getGigById);

/* ================= PROTECTED ROUTES ================= */

// Create gig (client only)
router.post("/create", auth, createGig);

// Get gigs posted by logged-in client
router.get("/me/list", auth, getMyGigs);

// Update gig
router.put("/update/:id", auth, updateGig);

// Delete gig
router.delete("/:id", auth, deleteGig);

module.exports = router;
