const ManifestoModal = require("../models/manifestoModal");

const manifestoController = {
  createManifesto: async (request, response) => {
    try {
      const { party, election, manifestoURL } = request.body;

      let existManifesto = await ManifestoModal.findOne({
        party,
        election,
        manifestoURL,
      });

      if (existManifesto) {
        return response.status(409).json({
          message: `Manifesto details already exists`,
        });
      }

      let newManifesto = await ManifestoModal.create(request.body);

      if (newManifesto) {
        return response.status(201).json({
          message: "Manifesto created successfully",
          newManifesto,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  updateManifesto: async (request, response) => {
    try {
      const { manifestoId } = request.params;

      let existManifesto = await ManifestoModal.findById(manifestoId);

      if (!existManifesto) {
        return response.status(401).json({
          message: `Manifesto does not exists`,
        });
      }
      let updateManifesto = await ManifestoModal.findByIdAndUpdate(
        manifestoId,
        request.body,
        { new: true }
      );

      if (updateManifesto) {
        return response.status(200).json({
          message: "Manifesto details updated successfully ",
          updateManifesto,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
};
module.exports = manifestoController;
