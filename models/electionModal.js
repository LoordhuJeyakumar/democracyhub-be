const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Election name is required"],
      trim: true,
      maxlength: [100, "Election name cannot exceed 100 characters"],
    },
    year: {
      type: Number,
      required: [true, "Election year is required"],
    },
    electionType: {
      type: String,
      enum: ["Parliamentary", "State", "Local"],
      required: [true, "Election type is required"],
    },
    phases: [
      {
        phaseNumber: {
          type: Number,
          required: [true, "Phase number is required"],
        },
        date: {
          type: Date,
          required: [true, "Phase date is required"],
        },
        states: {
          type: [String],
          required: [true, "States are required"],
        },
        constituencies: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Constituency",
            required: [true, "Constituency is required"],
          },
        ],
      },
    ],
    notificationDetails: {
      issueDate: {
        type: Date,
        required: [true, "Issue date is required"],
      },
      lastDateForNominations: {
        type: Date,
        required: [true, "Last date for nominations is required"],
      },
    },
    results: [
      {
        candidate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Candidate",
          default: null,
        },
        votesReceived: {
          type: Number,
          required: [true, "Votes received is required"],
          default: 0,
        },
      },
    ],
    manifestos: [
      {
        party: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Party",
          default: null,
        },
        manifestoURL: {
          type: String,
          trim: true,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

electionSchema.index({ name: 1, year: 1 });

const ElectionModal = mongoose.model("Election", electionSchema, "elections");

module.exports = ElectionModal;
