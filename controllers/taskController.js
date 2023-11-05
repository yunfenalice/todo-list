const Task = require("../models/taskModel");
const APIFeatures = require("../utils/apiFeatures");
const uuid = require("uuid");

exports.aliasTopTours = (req, res, next) => {
  //req.query.limit = "5";
  req.query.sort = "-text";
  req.query.fields = "text,isCompleted,id";
  next();
};

exports.getAllTasks = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Task.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tasks = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createTask = async (req, res) => {
  console.log("the req ", req.body);
  req.body.id = uuid.v4();
  try {
    const newTask = await Task.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTask = async (req, res) => {
  req.body.lastModifiedDate = new Date();
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.deleteMany({});

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
