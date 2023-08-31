const mongoose = require("mongoose");
//Set up default mongoose connection

const validator = require("validator");

const User = mongoose.model("User", {
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

module.exports = User;
