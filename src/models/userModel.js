const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const bcrypt = require("bcryptjs");
const Task = require("./taskModel");

const userSchema = new mongoose.Schema(
  {
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
      unique: true,
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
      // select: false,
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// We use this method getPublicProfile when i send a ( user ) but i need to update on res in all methods so
// there is a solution => rename the method to (toJSON)
// and this method update on all methods without change the res ;
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  delete userObj.avatar;

  return userObj;
};

// sometimes called model methods
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login ");
  }
  const hashedPassword = user.password;
  const isMatch = ()=>password===user.password;
  if (!isMatch) {
    throw new Error("Unable to login ");
  }

  return user;
};

// Delete user tasks when user is removed

userSchema.pre("findOneAndDelete", async function (next) {
  const user = this.getQuery();
  await Task.deleteMany({ owner: user._id });
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "5 days",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

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
