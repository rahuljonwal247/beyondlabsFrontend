const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001") + "/api/tasks";

export async function fetchTasks() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch tasks.");
  const data = await res.json();
  return data.tasks ?? [];
}

export async function createTask(title) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to create task.");
  }
  const data = await res.json();
  return data.task;
}

export async function markTaskComplete(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "completed" }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to update task.");
  }
  const data = await res.json();
  return data.task;
}
