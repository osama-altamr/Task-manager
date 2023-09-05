let path;

if (process.argv[1].toString().endsWith("index.js")) {
  path = `${__dirname}/./config/dev.env`;
  console.log("Dev Configgg");
} else {
  path = `${__dirname}/./config/test.env`;
  console.log("Test Configgg");
}

require("dotenv").config({ path });
require("./db/mongoose");

const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");

const express = require("express");
const app = express();

// app.use(authMiddleware);
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

module.exports = app;
