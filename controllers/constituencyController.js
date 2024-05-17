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
};

module.exports = constituencyController;
