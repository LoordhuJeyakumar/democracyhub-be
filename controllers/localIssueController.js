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
  updateLocalIssue: async (request,response) => {
    try {

        let {localIssueId} = request.params

        if (!localIssueId) {
            return response.status(400).json({ message: "localIssueId missing" });
          }

        let existIssue  = await LocalIssueModal.findById(localIssueId)

        if(!existIssue){
            return response.status(401).json({
                message: "Issue details does not exist, Please check localIssueId!",
              });
        }

        let updateIssue = await LocalIssueModal.findByIdAndUpdate(localIssueId,request.body, {new:true})

        if(updateIssue){
            return response.status(200).json({
                message: "Issue details updated successfully ",
                updateIssue,
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
module.exports = localIssueController;
