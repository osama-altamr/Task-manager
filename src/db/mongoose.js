const mongoose = require("mongoose");
//Set up default mongoose connection

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});
