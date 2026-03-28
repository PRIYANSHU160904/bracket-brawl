const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
    },
  },
  { _id: false },
); 

const problemSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    constraints: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    sampleTestCases: [testCaseSchema],
    hiddenTestCases: [testCaseSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Problem", problemSchema);
