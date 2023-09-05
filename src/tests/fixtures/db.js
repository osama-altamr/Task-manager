const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../../models/userModel");

const userOneId = "64f706010682a1d87352fbb1";
const Task = require("../../models/taskModel");

// new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  email: "altamr@gmail.com",
  password: "osamatmr2001",
  name: "Osama altamr",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTowId = new mongoose.Types.ObjectId();
const userTow = {
  _id: userTowId,
  email: "altamr22@gmail.com",
  password: "altamr3032001",
  name: "Tmr ",
  tokens: [
    {
      token: jwt.sign({ _id: userTowId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "test with Jest User 1 ",
  completed: false,
  owner: userOne._id,
};

const taskTow = {
  _id: new mongoose.Types.ObjectId(),
  description: "test with Jest User 2",
  completed: true,
  owner: userOne._id,
};
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third task User 2",
  completed: true,
  owner: userTow._id,
};

const setupDatabase = async () => {
  await User.deleteMany({});
  await Task.deleteMany({});

  await new User(userOne).save(); //for login test
  await new User(userTow).save(); //for login test
  await new Task(taskOne).save();
  await new Task(taskTow).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTowId,
  userTow,
  taskOne,
  taskTow,
  taskThree,
  setupDatabase,
};
