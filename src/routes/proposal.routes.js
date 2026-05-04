const express = require("express");
const router = express.Router();

const {
  getAllProposals,  // ✅ FIXED
  createProposal,
  getProposal,
  updateProposal,
  getAllProposalsClient,
  updateProposalStatus
} = require("../controllers/proposal.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/getAll/", authMiddleware, getAllProposals);
router.post("/getall/",authMiddleware,getAllProposalsClient)
router.get("/getProposal/:slug", authMiddleware, getProposal);
router.put("/update/", authMiddleware, updateProposal);
router.post("/create/", authMiddleware, createProposal);
router.patch("/status/:id", authMiddleware, updateProposalStatus);

module.exports = router;