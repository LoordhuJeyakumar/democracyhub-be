const mongoose = require("mongoose");

const partySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Party name is required"],
      trim: true,
      unique: true,
    },
    acronym: {
      type: String,
      trim: true,
      unique: true,
    },

    partyLogo: {
      type: String,
      trim: true,
    },
    partyWebsite: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid website URL`,
      },
    },
    manifestos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manifesto",
      },
    ],
    nationalPresidents: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        term: {
          from: {
            type: Date,
            required: true,
          },
          to: {
            type: Date,
            required: true,
          },
        },
      },
    ],
    statePresidents: [
      {
        state: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        term: {
          from: {
            type: Date,
            required: true,
          },
          to: {
            type: Date,
            required: true,
          },
        },
      },
    ],
    foundationDate: {
      type: Date,
      required: [true, "Party foundation date is required"],
    },
    officeAddress: {
      type: String,
      required: [true, "Party office address is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

partySchema.index({ name: 1, acronym: 1 });

const PartyModal = mongoose.model("Party", partySchema, "parties");

module.exports = PartyModal;
