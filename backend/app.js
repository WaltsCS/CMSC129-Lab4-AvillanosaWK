// backend/app.js

const express = require("express");
const { validateTaskInput } = require("./taskValidation");

const app = express();

app.use(express.json());

const tasks = [];
let nextId = 1;

app.post("/tasks", (req, res) => {
  const validation = validateTaskInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      errors: validation.errors,
    });
  }

  const task = {
    id: nextId,
    title: req.body.title,
    completed: false,
  };

  nextId += 1;
  tasks.push(task);

  return res.status(201).json(task);
});

app.get("/tasks", (req, res) => {
  return res.status(200).json(tasks);
});

module.exports = app;