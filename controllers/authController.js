const { validateSignUp, validateSignIn } = require("../helpers/validation");
const createError = require("http-errors");
const User = require("../models/userModal");

exports.signUp = async (req, res, next) => {
  try {
    const { error } = validateSignUp(req.body);

    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }

    const newUser = await User.create(req.body);

    newUser.password = undefined;
    res.status(201).json({
      message: "success",
      statusCode: 201,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = validateSignIn(req.body);
    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      throw createError.NotFound("User not registered!");
    }

    const correct = await user.isCorrectPassword(password, user.password);
    if (!correct) {
      throw createError.Unauthorized();
    }

    user.password = undefined;
    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: {
        accessToken: "asdfasdf",
        refreshToken: "afdasdfasdf",
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
