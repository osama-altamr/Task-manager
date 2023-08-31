const mongoose = require("mongoose");

const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 8,
    validate(val) {
      if (
        validator.isStrongPassword(val) ||
        val.toLowerCase().includes("password")
      ) {
        throw new Error("Password is too weak");
      }
    },
  },
  age: {
    type: Number,
    // min:[18," "]
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number ");
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  var user = this;
  if (user.isModified(user.password)) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// seprate model -> allow us to take advantage of middleware
const User = mongoose.model("User", userSchema);

module.exports = User;
