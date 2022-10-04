const express = require("express");
require("dotenv").config();
require("./db/mongoose");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

const app = express();
// const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app