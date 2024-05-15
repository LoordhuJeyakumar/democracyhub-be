const PartyModal = require("../models/partyModal");

const partiesController = {
  createParty: async (request, response) => {
    try {
      let { name, acronym } = request.body;

      let existParty = await PartyModal.findOne({
        name,
        acronym,
      });

      if (existParty) {
        return response.status(409).json({
          message: `Party details already exists`,
        });
      }

      let newParty = await PartyModal.create(request.body);

      if (newParty) {
        return response.status(201).json({
          message: "Party created successfully",
          newParty,
        });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  updatePartyDetails: async (request, response) => {
    try {
      let { partyId } = request.params;

      if (!partyId) {
        return response.status(400).json({ message: "PartyId missing" });
      }

      let partyDetails = await PartyModal.findById(partyId);

      if (!partyDetails) {
        return response.status(401).json({
          message: "Party details does not exist, Please check partyId!",
        });
      }

      let updatedParty = await PartyModal.findByIdAndUpdate(
        partyId,
        request.body,
        { new: true }
      );

      if (updatedParty) {
        return response.status(200).json({
          message: "Party details updated successfully ",
          updatedParty,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getPartyDetails: async (request, response) => {
    try {
      let { partyId } = request.params;

      if (!partyId) {
        return response.status(400).json({ message: "PartyId missing" });
      }

      let partyDetails = await PartyModal.findById(partyId);

      if (!partyDetails) {
        return response.status(401).json({
          message: "Party details does not exist, Please check partyId!",
        });
      }

      return response
        .status(200)
        .json({ message: "Party details fetched", partyDetails });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getAllPartyDetails: async (request, response) => {
    try {
      let allPartyDetails = await PartyModal.find();

      if (allPartyDetails?.length == 0) {
        return response.status(401).json({
          message: "There is no election details in database!",
        });
      }

      return response
        .status(200)
        .json({ message: "All Party details fetched", allPartyDetails });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },

  deletePartyById: async (request, response) => {
    try {
      let { partyId } = request.params;

      if (!partyId) {
        return response.status(400).json({ message: "PartyId missing" });
      }

      let partyDetails = await PartyModal.findById(partyId);

      if (!partyDetails) {
        return response.status(401).json({
          message: "Party details does not exist, Please check partyId!",
        });
      }

      let deletedParty = await partyDetails.deleteOne();

      return response.status(200).json({
        message: "Party details succesfully deleted",
        deletedParty,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
};

module.exports = partiesController;
