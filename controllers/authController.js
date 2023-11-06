const { validateSignUp, validateSignIn } = require("../helpers/validation");
const createError = require("http-errors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const {
  signAccessToken,
} = require("../helpers/jwt_service");

exports.signUp = async (req, res, next) => {
  try {
    const { error } = validateSignUp(req.body);

    if (error) {
      throw createError.BadRequest(error.details[0].message);
    }

    const newUser = await User.create(req.body);

    newUser.password = undefined;
    newUser.isActive = undefined;
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
    if (!user) {
      throw createError.NotFound("User not registered!");
    }

    const correct = await user.isCorrectPassword(password, user.password);
    if (!correct) {
      throw createError.Unauthorized();
    }

    const accessToken = signAccessToken(user.id);

    user.password = undefined;
    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: {
        accessToken,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.protectRoute = async (req, res, next) => {
  try {
    let token;
    let userid;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw createError.Unauthorized("You are not logged In", 401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          return next(createError.Unauthorized());
        }
        return next(createError.Unauthorized(err.message));
      }
      userid = payload.userId;
    });

    const currentUser = await User.findById(userid);
    if (!currentUser) {
      throw createError.NotFound("User not exist!");
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.grantAccess = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      throw createError.Forbidden('You don\'t have this permission')
    }
    next();
  };
};
