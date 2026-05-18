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

function updateTask(id, updates) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return null;
  }

  if (updates.title !== undefined) {
    task.title = updates.title;
  }

  if (updates.completed !== undefined) {
    task.completed = updates.completed;
  }

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};