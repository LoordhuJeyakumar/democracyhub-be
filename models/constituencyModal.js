const mongoose = require("mongoose");

const constituencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Constituency name is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State name is required"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "District name is required"],
      trim: true,
    },
    totalVoters: {
      type: Number,
      default: 0,
    },
    population: {
      type: Number,
      default: 0,
    },
    localIssues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LocalIssue",
      },
    ],
    candidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ConstituencyModal = mongoose.model(
  "Constituency",
  constituencySchema,
  "constituencies"
);

module.exports = ConstituencyModal;
