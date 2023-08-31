require("../src/db/mongoose.js");

const User = require("../src/models/userModel.js");
const Task = require("../src/models/taskModel.js");
// 64ef5f973a9e7af82795df19
// User.findByIdAndUpdate("64ef5f973a9e7af82795df19", { age: 25 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 25 });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((err) => console.log(err));

// const updateAgeAndGetCount = async (age, _id) => {
//   const user = await User.findByIdAndUpdate(_id, { age });
//   const count = await User.countDocuments({ age });
//   return count;
// };

// updateAgeAndGetCount(20, "64ef5f973a9e7af82795df19")
//   .then((count) => console.log(count))
//   .catch((err) => console.log(err));

const deleteTaskAndCount = async (_id) => {
  const task = await Task.findByIdAndDelete(_id);
  const count = await Task.countDocuments({
    completed: false,
  });
  return count;
};

deleteTaskAndCount("64ef60e7293743b6e81766e0")
  .then((count) => console.log(count))
  .catch((err) => console.log(err));
