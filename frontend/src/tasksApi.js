// frontend/src/tasksApi.js

async function parseJsonResponse(response) {
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function createTask(title) {
  const response = await fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return parseJsonResponse(response);
}

export async function updateTask(id, title) {
  const response = await fetch(`/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return parseJsonResponse(response);
}

export async function deleteTask(id) {
  await fetch(`/tasks/${id}`, {
    method: "DELETE",
  });
}