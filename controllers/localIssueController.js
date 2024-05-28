const LocalIssueModal = require("../models/localIssueModal");
const UserModal = require("../models/userModal");
const { uploadFile } = require("../utils/awsS3Service");

const localIssueController = {
  /* createIssue: async (request, response) => {
    try {
      const { title, description, location, category } = request.body;
      const files = request.files;
      console.log(request);
      console.log(request.files);

      if (!files) {
        return response.status(400).json({ message: "No files uploaded" });
      }
      // Upload photos to S3
      const photoUrls = await Promise.all(
        files.map((file) => uploadFile(file).then((data) => data.Location))
      );

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

      const newIssueData = {
        title,
        description,
        location,
        category,
        photos: photoUrls,
      };

      let newIssue = await LocalIssueModal.create(newIssueData);

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
  }, */

  /* createIssue: async (request, response) => {
    try {
      const { title, description, location, category } = request.body;
      const files = request.files;
      let user = await UserModal.findById(request.userId);
      if (!files || files.length === 0) {
        return response.status(400).json({ message: "No files uploaded" });
      }
      console.log(user);
      // Upload photos to S3
      const photoUrls = await Promise.all(
        files.map((file) => uploadFile(file).then((data) => data.Location))
      );

      let existIssue = await LocalIssueModal.findOne({
        title,
        description,
        location,
        category,
      });

      if (existIssue) {
        return response.status(409).json({
          message: "This issue details already exist",
        });
      }

      const newIssueData = {
        title,
        description,
        location,
        category,
        photos: photoUrls,
        createdBy: user._id,
        createdUserName: user.name,
      };

      let newIssue = await LocalIssueModal.create(newIssueData);

      if (newIssue) {
        return response
          .status(201)
          .json({ message: "Issue created successfully", newIssue });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  }, */
  createIssue: async (request, response) => {
    try {
      const { title, description, location, category } = request.body;
      const files = request.files;
      let user = await UserModal.findById(request.userId);

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      // Check if the issue already exists
      let existIssue = await LocalIssueModal.findOne({
        title,
        description,
        location,
        category,
      });

      if (existIssue) {
        return response.status(409).json({
          message: "This issue details already exist",
        });
      }

      // Upload photos to S3 if files are provided
      let photoUrls = [];
      if (files && files.length > 0) {
        photoUrls = await Promise.all(
          files.map((file) => uploadFile(file).then((data) => data.Location))
        );
      }

      const newIssueData = {
        title,
        description,
        location,
        category,
        createdBy: user._id,
        createdUserName: user.name,
      };

      // Conditionally add photos field if there are photos
      if (photoUrls.length > 0) {
        newIssueData.photos = photoUrls;
      }

      let newIssue = await LocalIssueModal.create(newIssueData);

      if (newIssue) {
        return response
          .status(201)
          .json({ message: "Issue created successfully", newIssue });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },

  updateLocalIssue: async (request, response) => {
    try {
      let { localIssueId } = request.params;

      if (!localIssueId) {
        return response.status(400).json({ message: "localIssueId missing" });
      }

      let existIssue = await LocalIssueModal.findById(localIssueId);

      if (!existIssue) {
        return response.status(401).json({
          message: "Issue details does not exist, Please check localIssueId!",
        });
      }

      let updateIssue = await LocalIssueModal.findByIdAndUpdate(
        localIssueId,
        request.body,
        { new: true }
      );

      if (updateIssue) {
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
  deleteIssueById: async (request, response) => {
    try {
      let { localIssueId } = request.params;

      if (!localIssueId) {
        return response.status(400).json({ message: "localIssueId missing" });
      }

      let existIssue = await LocalIssueModal.findById(localIssueId);

      if (!existIssue) {
        return response.status(401).json({
          message: "Issue details does not exist, Please check localIssueId!",
        });
      }

      let deleteIssue = await existIssue.deleteOne();
      if (deleteIssue) {
        return response
          .status(200)
          .json({ message: "Issue details succesfully deleted", deleteIssue });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  getIssueById: async (request, response) => {
    try {
      const { localIssueId } = request.params;
      if (!localIssueId) {
        return response.status(400).json({ message: "localIssueId missing" });
      }

      const existIssue = await LocalIssueModal.findById(localIssueId);

      if (!existIssue) {
        return response.status(401).json({
          message: "Issue details does not exist, Please check localIssueId!",
        });
      }

      return response
        .status(200)
        .json({ message: "Issue details fetched", existIssue });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },

  getAllIssues: async (request, response) => {
    try {
      const allIssues = await LocalIssueModal.find().sort({ createdAt: -1 });

      if (allIssues?.length == 0) {
        return response.status(401).json({
          message: "There is no Issue details in database!",
        });
      }

      return response
        .status(200)
        .json({ message: "All Issue details fetched", allIssues });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
  upVoteIssue: async (request, response) => {
    try {
      const { localIssueId } = request.params;
      const userId = request.userId;

      if (!localIssueId) {
        return response.status(400).json({ message: "localIssueId missing" });
      }

      const existIssue = await LocalIssueModal.findById(localIssueId, {
        _id: 1,
        upvotes: 1,
        downvotes: 1,
        title: 1,
        description: 1,
      });

      if (!existIssue) {
        return response.status(401).json({
          message: "Issue details does not exist, Please check localIssueId!",
        });
      }

      // Check if the user has already upvoted
      if (existIssue.upvotedBy.includes(userId)) {
        return response
          .status(400)
          .json({ message: "User has already upvoted this issue" });
      }

      // If not, increment upvotes and add user to upvotedBy array
      existIssue.upvotes += 1;
      existIssue.upvotedBy.push(userId);

      // If the user had previously downvoted the issue, decrement downvotes and remove user from downvotedBy array
      if (existIssue.downvotedBy.includes(userId)) {
        existIssue.downvotes -= 1;
        const index = existIssue.downvotedBy.indexOf(userId);
        if (index > -1) {
          existIssue.downvotedBy.splice(index, 1);
        }
      }

      let updateIssue = await existIssue.save();
      if (updateIssue) {
        return response.status(200).json({
          message: "Issue Upvoted successfully ",
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
  downVoteIssue: async (request, response) => {
    try {
      const { localIssueId } = request.params;
      const userId = request.userId;
      
      if (!localIssueId) {
        return response.status(400).json({ message: "localIssueId missing" });
      }

      const existIssue = await LocalIssueModal.findById(localIssueId, {
        _id: 1,
        upvotes: 1,
        downvotes: 1,
        title: 1,
        description: 1,
      });

      if (!existIssue) {
        return response.status(401).json({
          message: "Issue details does not exist, Please check localIssueId!",
        });
      }

      // Check if the user has already downvoted
      if (existIssue.downvotedBy.includes(userId)) {
        return response
          .status(400)
          .json({ message: "User has already downvoted this issue" });
      }

      // If not, increment downvotes and add user to downvotedBy array
      existIssue.downvotes += 1;
      existIssue.downvotedBy.push(userId);

      // If the user had previously upvoted the issue, decrement upvotes and remove user from upvotedBy array
    if (existIssue.upvotedBy.includes(userId)) {
      existIssue.upvotes -= 1;
      const index = existIssue.upvotedBy.indexOf(userId);
      if (index > -1) {
        existIssue.upvotedBy.splice(index, 1);
      }
    }

      let updateIssue = await existIssue.save();
      if (updateIssue) {
        return response.status(200).json({
          message: "Issue DownVote successfully ",
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
