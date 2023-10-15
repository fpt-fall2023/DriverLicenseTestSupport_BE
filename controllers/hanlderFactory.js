const createError = require("http-errors");
const APIfeatures = require("../utils/apiFeatures");

exports.deleteOneSoft = (Model) => async (req, res, next) => {
  try {
    const id = req.params.id;
    let filter = {};
    if (req.params.id) filter = { isActive: false };
    const doc = await Model.findByIdAndUpdate(id, filter);
    if (!doc) {
      throw createError.NotFound("Can not find document with that id");
    }
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      throw createError.NotFound("Can not find document with that id");
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
    const doc = await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    const modelName = Model.modelName;
    res.status(200).json({
      status: "success",
      data: {
        [modelName]: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAll = (Model, filterOptions) => async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    if (filterOptions) filter = filterOptions;

    const features = new APIfeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields();
    // .paginate();
    const doc = await features.mongooseQuery;

    const modelName = Model.modelName;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        [modelName]: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createOne = (Model, allowedFields) => async (req, res, next) => {
  try {
    let data = {};
    Object.keys(req.body).forEach((item) => {
      if (allowedFields?.includes(item)) {
        data[item] = req.body[item];
      }
    });

    const doc = await Model.create(Object.keys(data).length > 0 ? data : req.body);
    const modelName = Model.modelName;
    res.status(201).json({
      status: "success",
      data: {
        [modelName]: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};
