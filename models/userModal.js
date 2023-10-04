const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    // required: [true, "password is required"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    // required: [true, "confirm password is required"],
    // validate: {
    //   validator: function (val) {
    //     return val === this.password;
    //   },
    // },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user", "staff", "lecturer"],
  },
  avatar: String,
});

// note: only encrypt password when change password or create new
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.isCorrectPassword = async function (reqPassword, userDbPassword) {
  return await bcrypt.compare(reqPassword, userDbPassword);
};

module.exports = mongoose.model("User", userSchema);
