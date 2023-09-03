const User = require("../models/userModel");
const express = require("express");
const router = express.Router();

const multer = require("multer");
// Middleware Folder
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/logout", authMiddleware, async (req, res) => {
  try {
    console.log(req.token);
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", authMiddleware, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);

    if (!user) return res.status(404).send();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.send(e);
  }
});

// // For admin
// router.patch("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "age", "email"];

//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({
//       error: "Invalid updates",
//     });
//   }
//   try {
//     // For pre Middleware
//     const user = await User.findById(_id);
//     // user.name = 'John'
//     updates.forEach((update) => (user[update] = req.body[update]));

//     await user.save();

//     // NO run pre middleware
//     // console.log(user);
//     // const user = await User.findByIdAndUpdate(_id, req.body, {
//     //   new: true,
//     //   runValidators: true,
//     // });

//     if (!user) {
//       return res.status(404).send();
//     }
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(400).send();
//   }
// });

router.patch("/users/me", authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "email"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates",
    });
  }
  try {
    // For pre Middleware
    const user = req.user;
    // user.name = 'John'
    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/users", authMiddleware, (req, res) => {
  const users = User.find({});
  users
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
});

// for amdin

// router.delete("/users/:id", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.status(200).send();
//   } catch (err) {
//     res.status(500).send();
//   }
// });

router.delete("/users/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

const upload = multer({
  // dest: "public/images",
  limits: {
    fileSize: 1000000, // 1 mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload just an image"));
    }
    cb(null, true);
  },
});

router.post(
  "/users/me/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    // To get buffer you need to comment the dest
    req.user.avatar = req.file.buffer;
    // console.log(req.user.avatar);
    await req.user.save();
    res.status(200).send();
  },
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message,
    });
  }
);

module.exports = router;
