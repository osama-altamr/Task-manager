const mongoose = require("mongoose");
//Set up default mongoose connection

mongoose.connect("mongodb://127.0.0.1/task-manager", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});
