const Joi = require("joi");

const validateSignUp = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string()
      .pattern(new RegExp("gmail.com$"))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(6).required(),
    passwordConfirm: Joi.string()
      .min(6)
      .required()
      .equal(Joi.ref("password"))
      .messages({
        "any.only": "Passwords do not match",
      }),
    role: Joi.string().optional().default('user'),
    avatar: Joi.string().optional(),
    birthdate: Joi.string().optional()
  });
  return userSchema.validate(data);
};

const validateSignIn = (data) => {
  const userSchema = Joi.object({
    email: Joi.string()
      .pattern(new RegExp("gmail.com$"))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(6).required(),
  });
  return userSchema.validate(data)
};

module.exports = {
  validateSignUp,
  validateSignIn
};
