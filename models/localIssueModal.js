const mongoose = require("mongoose");

// Define the enum for the category field
const LocalIssueCategories = Object.freeze({
  Infrastructure: "Infrastructure",
  Education: "Education",
  Healthcare: "Healthcare",
  Environment: "Environment",
  Transportation: "Transportation",
  Safety: "Safety",
  PublicServices: "Public Services",
  EconomicDevelopment: "Economic Development",
  SocialWelfare: "Social Welfare",
  UrbanPlanning: "Urban Planning",
  CulturalPreservation: "Cultural Preservation",
  TechnologyInnovation: "Technology and Innovation",
  CommunityDevelopment: "Community Development",
  Other: "Other",
});

// Define the schema for the 'localIssues' collection in MongoDB
const localIssueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Local issue title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Local issue description is required"],
      trim: true,
    },
    photo: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: [true, "Location is required for the local issue"],
      trim: true,
    },
    category: {
      type: String,
      enum: Object.values(LocalIssueCategories),
      required: [true, "Category is required for the local issue"],
      trim: true,
    },
    constituency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Constituency",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportedAt: {
      type: Date,
      default: Date.now,
    },
    resolutionDescription: {
      type: String,
      default: "",
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the LocalIssue model using the localIssueSchema
const LocalIssueModal = mongoose.model(
  "LocalIssue",
  localIssueSchema,
  "localIssues"
);

module.exports = LocalIssueModal;
