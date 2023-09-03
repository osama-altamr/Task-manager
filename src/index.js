require("./db/mongoose");

const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware Folder

const authMiddleware = require("./middlewares/authMiddleware");

app.listen(port, () => {
  console.log("Server is up on port", port);
});

// app.use(authMiddleware);
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
