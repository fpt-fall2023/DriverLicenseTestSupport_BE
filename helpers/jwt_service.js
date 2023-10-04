const jwt = require("jsonwebtoken");

exports.signAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.verifyAccesstoken = (req, res, next) => {

};
