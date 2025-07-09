import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { createTask, deleteTask, getTasks, updateTask } from "./services/api";
import { type Task } from "./types/Task";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (title: string) => {
    const newTask = await createTask({ title });
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdate = async (task: Task) => {
    const updated = await updateTask(task);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.completed : t.completed
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
        <TaskForm onCreate={handleCreate} />
        <div className="flex gap-2 mb-4">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded ${
                filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <TaskList
          tasks={filteredTasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
