const ManifestoModal = require("../models/manifestoModal");

const findManifestoById = async (manifestoId, response) => {
  try {
    let manifesto = await ManifestoModal.findById(manifestoId);
    if (!manifesto) {
      response.status(404).json({ message: "Manifesto does not exist" });
      return null;
    }
    return manifesto;
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Internal Server Error", error: error.message });
    return null;
  }
};

const common500Error = (error, response) => {
  console.error(error);
  return response
    .status(500)
    .json({ error: "Internal Server Error", error: error.message });
};

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

      let existManifesto = await findManifestoById(manifestoId, response);
      if (!existManifesto) return;

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
  deleteManifesto: async (request, response) => {
    try {
      const { manifestoId } = request.params;

      let existManifesto = await findManifestoById(manifestoId, response);
      if (!existManifesto) return;

      let deleteManifesto = await ManifestoModal.findByIdAndDelete(manifestoId);

      if (deleteManifesto) {
        return response.status(200).json({
          message: "Manifesto details deleted successfully ",
          deleteManifesto,
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getManifestoById: async (request, response) => {
    try {
      const { manifestoId } = request.params;

      if (!manifestoId) {
        return response.status(400).json({ message: "manifestoId missing" });
      }

      let existManifesto = await findManifestoById(manifestoId, response);
      if (!existManifesto) return;
      return response
        .status(200)
        .json({ message: "Manifesto details fetched", existManifesto });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getAllManifestosDetails: async (request, response) => {
    try {
      let allManifestos = await ManifestoModal.find();

      if (allManifestos?.length == 0) {
        return response.status(401).json({
          message: "There is no manifesto details in database!",
        });
      }

      return response
        .status(200)
        .json({ message: "All Manifestos details fetched", allManifestos });
    } catch (error) {
      common500Error(error, response);
    }
  },
};
module.exports = manifestoController;
