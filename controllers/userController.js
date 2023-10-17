const multer = require("multer");
const createError = require("http-errors");
const User = require("../models/userModal");
const factory = require("../controllers/hanlderFactory");

const multerStorage = multer.diskStorage({  
  destination: (req, file, cb) => {  // store in file system of the project
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {  // give a file some unique file name
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`); // user-1219201321ba-2323234.jpeg
  },
});

const multerFilter = (req, file, cb) => { // test if uploaded file is an image
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      createError.BadRequest("Not an image! Please upload only images"),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage, 
  fileFilter: multerFilter,
});

exports.uploadUserAvatar = upload.single("avatar");

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

    let filteredBody = filterObj(
      req.body,
      "name",
      "email",
      "birthdate",
      "avatar"
    );
    if(req.file) filteredBody.avatar = req.file.filename;
    // update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if(!updatedUser) {
      throw createError.NotFound('Can Not Find User With That ID')
    }

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
exports.deleteUser = factory.deleteOneSoft(User);
exports.updateUser = factory.UpdateOne(User);
exports.getAllUsers = factory.getAll(User, { isActive: true });
exports.createUser = factory.createOne(User);
