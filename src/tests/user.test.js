const request = require("supertest");
const app = require("../app.js");

const User = require("../models/userModel");

const { userOne, userOneId, setupDatabase } = require("./fixtures/db.js");

beforeEach(setupDatabase);

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY3
MDYwMTA2ODJhMWQ4NzM1MmZiYjEiLCJpYXQiOjE2OTM5MTA2MDZ9.fjZHf8FiTGYNGbroCbNJjCG4qQdUA9Um-zOVI_4ixvw 
 */

// afterEach(() => {
//   console.log("After Each");
// });

test("Should signup a new user", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      name: "Osama tr",
      email: "osama03@gmail.com",
      password: "osama3032001",
      age: 22,
    })
    .expect(201);
  // Assert that the DB was changed correctly
  const user = await User.findById(res.body.user._id);
  expect(user).not.toBeNull();
  // Asseration about the response

  // expect(res.body.user.name).toBe("Osama tr");
  expect(res.body).toMatchObject({
    user: {
      name: "Osama tr",
      email: "osama03@gmail.com",
    },
    // token: userOne.tokens[0].token,
  });
});

test("Should login existing user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(res.body.user._id);
  expect(res.body.token).toBe(user.tokens[1].token);
});

// test("Should no login  nonexisting user ", async () => {
//   await request(app)
//     .post("/users/login")
//     .send({
//       email: userOne.email,
//       password: "hellofrom",
//     })
//     .expect(400);
// });

test("Should get profile for user ", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
});

const wrongToken = userOne.tokens[0].token + "wt";
test("Should not get profile for unauthenticated user ", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .set("Authorization", `Bearer ${wrongToken}`)
    .expect(401);
});

test("Should delete account for user ", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not  delete account for unauthenticate user ", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .set("Authorization", `Bearer ${wrongToken}`)
    .expect(401);
});

test("Should uplaod avatar image ", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", `${__dirname}/./fixtures/node.jpg`)
    .expect(200);
  const user = await User.findById(userOneId);

  /*   // expect({}).toBe({});

// avatar property check if it equals any buffer 


  // 1 === 1 toBe
  // {} === {}  equal the save properties */
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields ", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Tr loves it",
    })
    .expect(200);
  const user = await User.findById(userOneId);

  expect(user.name).toBe("Tr loves it");
});

test("Should not update invalid user fields ", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      password: "osama2202",
    })
    .expect(400);
});

// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated