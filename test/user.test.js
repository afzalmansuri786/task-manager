const request = require("supertest");
const app = require("../src/app");
const { User } = require("../src/models/user");
const express = require("express");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");
app.use(express.json());

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Debi Prasad",
      email: "debiprasadmishra5@github.dev",
      password: "debidebidebi!",
    })
    .expect(201);

  const data = response.body.user._id;

  console.log(data);

  const user = await User.findById(data);
  console.log(user);

  expect(user).not.toBeNull();

  expect(response.body.user.name);
  expect(response.body).toMatchObject({
    user: {
      name: "Debi Prasad",
      email: "debiprasadmishra5@github.dev",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("debidebidebi");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexisting user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "thisisnotmypassword",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  const response = await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "test/fixtures/pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  console.log("User profile :", user);

  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Abella",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Abella");
});

test("SHould not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Alabama",
    })
    .expect(400);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findByIdAndDelete(userOne.id);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});