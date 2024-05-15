const ElectionModal = require("../models/electionModal");

const electionController = {
  createElection: async (request, response) => {
    try {
      let { name, year, electionType } = request.body;

      let existElection = await ElectionModal.findOne({
        name,
        year,
        electionType,
      });

      if (existElection) {
        return response.status(409).json({
          message: `Election details already exists`,
        });
      }

      let newElection = await ElectionModal.create(request.body);

      if (newElection) {
        return response.status(201).json({
          message: "Election created successfully",
          newElection,
        });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  updateElectionDetails: async (request, response) => {
    try {
      let { electionId } = request.params;

      if (!electionId) {
        return response.status(400).json({ message: "ElectionId missing" });
      }

      let electionDetails = await ElectionModal.findById(electionId);

      if (!electionDetails) {
        return response.status(401).json({
          message: "Election details does not exist, Please check electionId!",
        });
      }

      let updatedElection = await ElectionModal.findByIdAndUpdate(
        electionId,
        request.body,
        { new: true }
      );

      if (updatedElection) {
        return response.status(200).json({
          message: "Election details updated successfully ",
          updatedElection,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getElectionDetails: async (request, response) => {
    try {
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
};

module.exports = electionController;
