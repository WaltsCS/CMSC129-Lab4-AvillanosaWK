// backend/taskStore.js

const tasks = [];
let nextId = 1;

function createTask(title) {
  const task = {
    id: nextId,
    title,
    completed: false,
  };

  nextId += 1;
  tasks.push(task);

  return task;
}

function getTasks() {
  return tasks;
}

module.exports = {
  createTask,
  getTasks,
};