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
          required: [true, "Phase number is required"],
        },
        date: {
          type: Date,
          required: [true, "Phase date is required"],
        },
        states: {
          type: [String],
          required: [true, "States are required"],
          validate: {
            validator: function (array) {
              return array.length > 0;
            },
            message: "There must be at least one state",
          },
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
        required: [true, "Winner is required"],
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
          validate: {
            validator: function (v) {
              return /^https?:\/\/\S+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
          },
        },
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
