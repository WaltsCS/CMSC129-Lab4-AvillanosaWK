// backend/app.js

const express = require("express");
const { validateTaskInput } = require("./taskValidation");
const { createTask, getTasks } = require("./taskStore");

const app = express();

app.use(express.json());

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

module.exports = app;