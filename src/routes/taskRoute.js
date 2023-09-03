const Task = require("../models/taskModel");
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

router.post("/tasks", authMiddleware, async (req, res) => {
  // const task = new Task(req.body);

  // ... es6 spread operator
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get tasks?completed=true
// tasks?limit=10&skip=0
// sort =createdAt:desc or asc
router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const { completed, description } = { ...req.query };
    const sort = {};
    // const tasks = await Task.find({ owner: req.user._id });
    if (req.query.sort) {
      const parts = req.query.sort.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
      console.log(sort);
    }
    const user = req.user;
    await user.populate({
      path: "tasks",
      match: {
        // completed,
      },  
      options: {
        limit: req.query.limit,
        skip: req.query.skip, 
      },
      sort: sort,
    });

    res.send(req.user.tasks);
  } catch (err) {
    console.log(err);
    // res.status(500).send(err);
  }
});

router.get("/tasks/:id", authMiddleware, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", authMiddleware, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates " });
  }

  try {
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // const task = await Task.findById({ _id});
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.status(200).send(task);
  } catch (err) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
