const LocalIssueModal = require("../models/localIssueModal");

const localIssueController = {
  createIssue: async (request, response) => {
    try {
      const { title, description, location, category } = request.body;

      let existIssue = await LocalIssueModal.findOne({
        title,
        description,
        location,
        category,
      });

      if (existIssue) {
        return response.status(409).json({
          message: `This issue details already exists`,
        });
      }

      let newIssue = await LocalIssueModal.create(request.body);

      if (newIssue) {
        return response
          .status(201)
          .json({ message: "Issue created succesfully", newIssue });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
};
module.exports = localIssueController;
