const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      maxlength: 3000,
    },

    category: {
      type: String,
      enum: [
        "Web Development",
        "Mobile App",
        "UI / UX Design",
        "Marketing",
      ],
      default: "Web Development",
    },

    /* ================= BUDGET ================= */
    minBudget: {
      type: Number,
      required: true,
      min: 0,
    },

    maxBudget: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (value) {
          return value >= this.minBudget;
        },
        message: "Max budget must be greater than min budget",
      },
    },

    duration: {
      type: String,
      enum: [
        "Less than 1 week",
        "1–2 weeks",
        "1 month",
        "More than 1 month",
      ],
      default: "Less than 1 week",
    },

    /* ================= SKILLS ================= */
    skills: {
      type: [String],
      required: true,
      validate: [
        {
          validator: (arr) => arr.length > 0,
          message: "At least one skill is required",
        },
      ],
    },

    /* ================= STATUS ================= */
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    /* ================= RELATIONS ================= */
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gig", gigSchema);
