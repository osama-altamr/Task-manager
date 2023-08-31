const Task = require("../models/taskModel");
const express = require("express");
const router = express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) return res.status(404);
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/:id", async (req, res) => {
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

    const task = await Task.findById(_id);
    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
