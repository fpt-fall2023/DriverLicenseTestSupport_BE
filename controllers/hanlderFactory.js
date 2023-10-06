const createError = require("http-errors");
const { findByIdAndUpdate } = require("../models/userModal");

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const id = req.params.id;
    let filter = {};
    if (req.params.id) filter = { isActive: false };
    const doc = await Model.findByIdAndUpdate(id, filter);
    if (!doc) {
      throw createError.NotFound("Can not find user with that id");
    }
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

exports.UpdateOne = (Model) => async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const doc = Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        Model: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};
