const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, 
    },
    status: {
      type: String,
      enum: ["waiting", "ongoing", "completed", "aborted"],
      default: "waiting",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Match", matchSchema);
