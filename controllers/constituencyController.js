const ConstituencyModal = require("../models/constituencyModal");

const constituencyController = {
  createConstituency: async (request, response) => {
    try {
      const { name, state, district } = request.body;

      if (!name || !state || !district) {
        return response
          .status(400)
          .json({ message: "name, state, district are requierd" });
      }

      const existConstituency = await ConstituencyModal.findOne({
        name,
        state,
        district,
      });

      if (existConstituency) {
        return response.status(409).json({
          message: `This Constituency details already exists`,
        });
      }

      let newConstituency = await ConstituencyModal.create(request.body);

      if (newConstituency) {
        return response.status(201).json({
          message: "Constituency created succesfully",
          newConstituency,
        });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  updateConstituencyById: async (request, response) => {
    try {
      const { constituencyId } = request.params;
      if (!constituencyId) {
        return response.status(400).json({ message: "constituencyId missing" });
      }

      const existConstituency = await ConstituencyModal.findById(
        constituencyId
      );

      if (!existConstituency) {
        return response.status(401).json({
          message:
            "Constituency details does not exist, Please check constituencyId!",
        });
      }

      let updateConstituency = await existConstituency.updateOne(request.body);

      if (updateConstituency) {
        return response.status(200).json({
          message: "Constituency details updated successfully ",
          updateConstituency,
        });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  deleteConstituencyById: async (request, response) => {
    try {
      const { constituencyId } = request.params;
      if (!constituencyId) {
        return response.status(400).json({ message: "constituencyId missing" });
      }

      const existConstituency = await ConstituencyModal.findById(
        constituencyId
      );

      if (!existConstituency) {
        return response.status(401).json({
          message:
            "Constituency details does not exist, Please check constituencyId!",
        });
      }

      const deletedConstituency = await ConstituencyModal.findByIdAndDelete(
        existConstituency._id
      );

      if (deletedConstituency) {
        return response.status(200).json({
          message: "Constituency details succesfully deleted",
          deletedConstituency,
        });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getAllConstituencies: async (request, response) => {
    try {
      const allConstituencies = await ConstituencyModal.find();
      if (allConstituencies?.length == 0) {
        return response.status(401).json({
          message: "There is no Constituency details in database!",
        });
      }

      return response.status(200).json({
        message: "All Constituencies details fetched",
        allConstituencies,
      });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getConstituencyById: async (request, response) => {
    try {
      const { constituencyId } = request.params;
      if (!constituencyId) {
        return response.status(400).json({ message: "constituencyId missing" });
      }

      const existConstituency = await ConstituencyModal.findById(
        constituencyId
      );

      if (!existConstituency) {
        return response.status(401).json({
          message:
            "Constituency details does not exist, Please check constituencyId!",
        });
      }

      return response
        .status(200)
        .json({ message: "Constituency details fetched", existConstituency });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
};

module.exports = constituencyController;
