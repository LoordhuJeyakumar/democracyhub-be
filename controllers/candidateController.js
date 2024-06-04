const CandidateModel = require("../models/candidateModal");
const handleError = (response, error) => {
  console.error(error);
  return response.status(500).json({
    status: "error",
    message: "Internal server error occurred in candidate",
    error: error.message,
  });
};

const handleNotFound = (response, message) => {
  return response.status(404).json({
    status: "fail",
    message: message,
  });
};
const candidateController = {
  createCandidate: async (request, response) => {
    const {
      name,
      age,
      party,
      constituency,
      manifesto,
      electionsParticipated,
      isIncumbent,
    } = request.body;

    // Check if all required fields are provided
    if (!name || !age || !party || !constituency) {
      return response.status(400).json({
        status: "fail",
        message: "Required fields are missing",
      });
    }

    try {
      // Check if a candidate with the same name, party, and constituency already exists
      const existingCandidate = await CandidateModel.findOne({
        name,
        party,
        constituency,
      });

      if (existingCandidate) {
        return response.status(409).json({
          status: "fail",
          message:
            "A candidate with the same name, party, and constituency already exists",
        });
      }

      // Create a new candidate
      const candidate = new CandidateModel({
        name,
        age,
        party,
        constituency,
        manifesto,
        electionsParticipated,
        isIncumbent,
      });

      // Save the candidate to the database
      await candidate.save();

      // Send a success response
      response.status(201).json({
        status: "success",
        message: "Candidate created successfully",
        data: {
          candidate,
        },
      });
    } catch (error) {
      // Send an error response
      response.status(500).json({
        status: "error",
        message: "Internal server error occurred while creating the candidate",
        error: error.message,
      });
    }
  },
  getCandidate: async (request, response) => {
    const { candidateId } = request.params;

    try {
      const candidate = await CandidateModel.findById(candidateId);

      if (!candidate) {
        return handleNotFound(
          response,
          "No candidate found with that candidateId"
        );
      }

      response.status(200).json({
        status: "success",
        data: {
          candidate,
        },
      });
    } catch (error) {
      handleError(response, error);
    }
  },
  getAllCandidates: async (request, response) => {
    try {
      const candidates = await CandidateModel.find();

      return response.status(200).json({
        status: "success",
        results: candidates.length,
        data: {
          candidates,
        },
      });
    } catch (error) {
      return handleError(response, error);
    }
  },
  updateCandidate: async (request, response) => {
    const { candidateId } = request.params;
    const updateData = request.body;

    try {
      const candidate = await CandidateModel.findByIdAndUpdate(
        candidateId,
        updateData,
        { new: true }
      );

      if (!candidate) {
        return handleNotFound(
          response,
          "No candidate found with that candidateId"
        );
      }

      // Send a success response
      return response.status(200).json({
        status: "success",
        message: "Candidate updated successfully",
        data: {
          candidate,
        },
      });
    } catch (error) {
      return handleError(response, error);
    }
  },
  deleteCandidate: async (request, response) => {
    const { candidateId } = request.params;

    try {
      const candidate = await CandidateModel.findByIdAndDelete(candidateId);

      if (!candidate) {
        return handleNotFound(
          response,
          "No candidate found with that candidateId"
        );
      }

      // Send a success response
      return response.status(200).json({
        status: "success",
        message: "Candidate deleted successfully",
      });
    } catch (error) {
      return handleError(response, error);
    }
  },
};

module.exports = candidateController;
