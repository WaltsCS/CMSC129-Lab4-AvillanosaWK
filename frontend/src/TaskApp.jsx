import { useRef, useState } from "react";

export default function TaskApp() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const nextUiId = useRef(1);

  async function addTask() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const response = await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: trimmedTitle }),
    });

    const createdTask = await response.json();

    const task = {
      id: nextUiId.current,
      backendId: createdTask.id,
      title: createdTask.title,
      completed: createdTask.completed,
    };

    nextUiId.current += 1;
    setTasks((currentTasks) => [...currentTasks, task]);
    setTitle("");
  }

  function startEditing(task) {
    setEditingId(task.id);
    setEditingTitle(task.title);
  }

  async function saveTask(task) {
    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    await fetch(`/tasks/${task.backendId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: trimmedTitle }),
    });

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === task.id ? { ...item, title: trimmedTitle } : item,
      ),
    );

    setEditingId(null);
    setEditingTitle("");
  }

  async function removeTask(task) {
    await fetch(`/tasks/${task.backendId}`, {
      method: "DELETE",
    });

    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== task.id),
    );
  }

  return (
    <main>
      <h1>Task Manager</h1>

      <input
        data-testid="task-title-input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter task title"
      />

      <button data-testid="add-task-button" onClick={addTask}>
        Add Task
      </button>

      <ul data-testid="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {editingId === task.id ? (
              <>
                <input
                  data-testid={`edit-task-input-${task.id}`}
                  type="text"
                  value={editingTitle}
                  onChange={(event) => setEditingTitle(event.target.value)}
                />

                <button
                  data-testid={`save-task-button-${task.id}`}
                  onClick={() => saveTask(task)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{task.title}</span>

                <button
                  data-testid={`edit-task-button-${task.id}`}
                  onClick={() => startEditing(task)}
                >
                  Edit
                </button>

                <button
                  data-testid={`delete-task-button-${task.id}`}
                  onClick={() => removeTask(task)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}