import { type Task } from "../types/Task";

const API_URL = "http://localhost:3001/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createTask(data: { title: string }): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, completed: false }),
  });
  return res.json();
}

export async function updateTask(task: Task): Promise<Task> {
  const res = await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
