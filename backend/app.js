// backend/app.js

const express = require("express");
const { validateTaskInput } = require("./taskValidation");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("./taskStore");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Task Manager placeholder</h1>");
});

app.post("/tasks", (req, res) => {
  const validation = validateTaskInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      errors: validation.errors,
    });
  }

  const task = createTask(req.body.title);

  return res.status(201).json(task);
});

app.get("/tasks", (req, res) => {
  return res.status(200).json(getTasks());
});

app.put("/tasks/:id", (req, res) => {
  const validation = validateTaskInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      errors: validation.errors,
    });
  }

  const task = updateTask(Number(req.params.id), {
    title: req.body.title,
  });

  if (!task) {
    return res.status(404).json({
      errors: ["Task not found"],
    });
  }

  return res.status(200).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const deleted = deleteTask(Number(req.params.id));

  if (!deleted) {
    return res.status(404).json({
      errors: ["Task not found"],
    });
  }

  return res.status(204).send();
});

module.exports = app;