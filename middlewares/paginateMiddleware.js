const paginate = (model) => {
  return async (req, res, next) => {
    try {
      const page = Math.max(1, parseInt(req.query.page, 10) || 1);
      const limit = Math.min(
        Math.max(1, parseInt(req.query.limit, 10) || 50),
        100
      ); // Set a max limit of 100

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const total = await model.countDocuments();

      const pagination = {};

      if (endIndex < total) {
        pagination.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        pagination.prev = {
          page: page - 1,
          limit,
        };
      }

      res.pagination = {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        ...pagination,
      };

      req.pagination = { startIndex, limit }; // Pass these details for data fetching

      next();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error calculating pagination details", error });
    }
  };
};

module.exports = paginate;
