const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
      maxlength: [100, "Candidate name cannot exceed 100 characters"],
    },
    age: {
      type: Number,
      required: [true, "Candidate age is required"],
      min: [18, "Candidate must be at least 18 years old"],
      max: [100, "Candidate cannot be more than 100 years old"],
    },
    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: [true, "Party is required"],
    },
    constituency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Constituency",
      required: [true, "Constituency is required"],
    },
    manifesto: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/\S+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
      default: "",
    },
    electionsParticipated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election",
      },
    ],
    isIncumbent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

candidateSchema.index({ name: 1, party: 1, constituency: 1 });

candidateSchema.method("participatedElectionsCount", function () {
  return this.electionsParticipated.length;
});

candidateSchema.static("findByName", function (name) {
  return this.find({ name: new RegExp(name, "i") });
});

const CandidateModel = mongoose.model(
  "Candidate",
  candidateSchema,
  "candidates"
);

module.exports = CandidateModel;
