const findCommentById = async (commentId, response) => {
  try {
    let comment = await CommentModal.findById(commentId);
    if (!comment) {
      response.status(404).json({ message: "Comment does not exist" });
      return null;
    }
    return comment;
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

module.exports = {
  findCommentById,
  common500Error,
};
