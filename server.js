// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const taskRouter = require("./routes/taskRouter");

const app = express();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// const tasksRouter = require("./routes/tasks");

const port = process.env.PORT || 3001;
// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
app.use("/api/v1/tasks", taskRouter);
app.get("/test", (req, res) => {
  res.send("Hello, World! This is my Express app.");
});
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     retryWrites: true,
//   })
//   .then(() => console.log("DB connection successful!"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
