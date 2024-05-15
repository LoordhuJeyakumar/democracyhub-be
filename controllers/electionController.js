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
      

      return response.status(200).json({message:"Election details fetched", electionDetails})

    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getAllElectionDetails: async (request, response) => {
    try {
      

      let allElectionDetails = await ElectionModal.find()

      if (!allElectionDetails) {
        return response.status(401).json({
          message: "There is no election details in database!",
        });
      }
      

      return response.status(200).json({message:"All Election details fetched", allElectionDetails})

    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getElectionByType: async (request, response) => {
    try {
      let { electionType } = request.params;

      if (!electionType) {
        return response.status(400).json({ message: "Election Type missing" });
      }

      let electionDetails = await ElectionModal.findOne({electionType:electionType});

      if (!electionDetails) {
        return response.status(401).json({
          message: "Election details does not exist, Please check electionType!",
        });
      }
      

      return response.status(200).json({message:"Election details fetched", electionDetails})

    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
};

module.exports = electionController;
