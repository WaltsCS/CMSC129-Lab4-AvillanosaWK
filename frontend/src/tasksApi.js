// frontend/src/tasksApi.js

const STORAGE_KEY = "task-done-daily-tasks";

function readTasks() {
  const storedTasks = localStorage.getItem(STORAGE_KEY);

  if (!storedTasks) {
    return [];
  }

  return JSON.parse(storedTasks);
}

function writeTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getNextId(tasks) {
  if (tasks.length === 0) {
    return 1;
  }

  return Math.max(...tasks.map((task) => task.id)) + 1;
}

export async function getTasks() {
  return readTasks();
}

export async function createTask(title) {
  const tasks = readTasks();

  const task = {
    id: getNextId(tasks),
    title,
    completed: false,
  };

  writeTasks([...tasks, task]);

  return task;
}

export async function updateTask(id, title) {
  const tasks = readTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, title } : task,
  );

  writeTasks(updatedTasks);

  return updatedTasks.find((task) => task.id === id);
}

export async function deleteTask(id) {
  const tasks = readTasks();

  const updatedTasks = tasks.filter((task) => task.id !== id);

  writeTasks(updatedTasks);
}