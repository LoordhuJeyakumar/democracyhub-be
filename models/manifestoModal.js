const mongoose = require("mongoose");

const manifestoSchema = new mongoose.Schema(
  {
    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: [true, "Party is required"],
    },
    election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: [true, "Election is required"],
    },
    manifestoURL: {
      type: String,
      trim: true,
      required: [true, "Manifesto URL is required"],
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid website URL`,
      },
    },
    keyPoints: [
      {
        point: {
          type: String,
          /* required: [true, "Key point is required"], */
          trim: true,
        },
        description: {
          type: String,
          /* required: [true, "Description is required"], */
          trim: true,
        },
        default: [],
      },
    ],
    vision: {
      type: String,
      trim: true,
      default: "",
    },
    promises: [
      {
        issue: {
          type: String,
          /* required: [true, "Issue is required"], */
          trim: true,
        },
        plan: {
          type: String,
          /*  required: [true, "Plan is required"], */
          trim: true,
        },
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ManifestoModal = mongoose.model(
  "Manifesto",
  manifestoSchema,
  "manifestos"
);

module.exports = ManifestoModal;
