const app = require('./app')

// const express = require("express");
// require("dotenv").config();
// require("./db/mongoose");
// const userRouter = require("./routers/userRouter");
// const taskRouter = require("./routers/taskRouter");

// const app = express();


// app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});