const express = require("express");
const taskController = require("./../controllers/taskController");

const router = express.Router();

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask)
  .delete(taskController.deleteTask);

router.route("/:id").patch(taskController.updateTask);

module.exports = router;
