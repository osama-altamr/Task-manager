const mongoose = require("mongoose");
//Set up default mongoose connection

const validator = require("validator");
mongoose.connect("mongodb://127.0.0.1/task-manager", {
  useNewUrlParser: true,
  //   useCreateIndex: true,
});
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
  age: {
    type: Number,
    // min:[18," "]
    default:0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number ");
      }
    },
  },
});

// const me = new User({ name: "Osama", age: 23 });

// me.save()
//   .then((me) => {
//     console.log(me);
//   })
//   .catch((err) => {
//     console.log("Error:", err);
//   });

const Task = mongoose.model("Task", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

// const task = new Task({
//   description: "learn the mongoose library",
//   completed: true,
// });

// task
//   .save()
//   .then((task) => {
//     console.log(task);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });
