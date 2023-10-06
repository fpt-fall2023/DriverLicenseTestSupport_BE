const createError = require("http-errors");
const User = require("../models/userModal");
const factory = require("../controllers/hanlderFactory");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isActive: true }).select("-__v");

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

const filterObj = (obj, ...allowedField) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

// Update user information
exports.UpdateMe = async (req, res, next) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      throw createError.BadRequest("This route is not for password updates");
    }

    const filteredBody = filterObj(
      req.body,
      "name",
      "email",
      "birthdate",
      "avatar"
    );
    // update user
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// two of this for admin operation
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.UpdateOne(User);
