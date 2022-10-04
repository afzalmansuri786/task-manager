const express = require("express");
const request = require("supertest");
const { Task } = require("../src/models/task");
const app = require("../src/app");
const {
  userOneId,
  userTwo,
  userTwoId,
  userOne,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
} = require("./fixtures/db");
app.use(express.json());

beforeEach(setupDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Testing automation",
    })
    .expect(201);

  console.log(response.body);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should get tasks of userOne", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  console.log(response.body);
  expect(response.body.length).toEqual(2);
});

test("Should get tasks of userTwo", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
  console.log(response.body);
  expect(response.body.length).toEqual(1);
});

test("Should not delete other user tasks", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.token[0].token}`)
    .send(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
