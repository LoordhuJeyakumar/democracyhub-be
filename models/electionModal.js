const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Election name is required"],
      trim: true,
      maxlength: [100, "Election name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    year: {
      type: Number,
      required: [true, "Election year is required"],
      min: [1900, "Year must be greater than or equal to 1900"],
      max: [
        new Date().getFullYear() + 1,
        "Year must be less than or equal to next year",
      ],
    },
    electionType: {
      type: String,
      enum: [
        "Parliamentary",
        "StateAssembly",
        "Local",
        "RajyaSabha",
        "Presidential",
        "VicePresidential",
        "LegislativeCouncil",
      ],
      required: [true, "Election type is required"],
    },

    phases: [
      {
        phaseNumber: {
          type: Number,
          default: null,
        },
        date: {
          type: Date,
          default: null,
        },
        states: {
          type: [String],
          default: [],
        },
        constituencies: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Constituency",
            default: null,
          },
        ],
      },
    ],
    notificationDetails: {
      issueDate: {
        type: Date,
        default: null,
      },
      lastDateForNominations: {
        type: Date,
        default: null,
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
          default: 0,
          min: [0, "Votes received cannot be negative"],
        },
        won: {
          type: Boolean,
          default: false,
        },
      },
    ],
    winners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        default: null,
      },
    ],
    manifestos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manifesto",
      },
    ],
  },
  {
    timestamps: true,
  }
);

electionSchema.index({ name: 1, year: 1 });
electionSchema.index({ year: 1 });
electionSchema.index({ "phases.date": 1 });

const ElectionModel = mongoose.model("Election", electionSchema, "elections");

module.exports = ElectionModel;
