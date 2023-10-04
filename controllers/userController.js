const createError = require("http-errors");
const User = require("../models/userModal");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-__v");

    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};
