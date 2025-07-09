import React, { useState } from "react";

type Props = Readonly<{ onCreate: (title: string) => void }>;

export default function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title.trim());
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        className="flex-1 border rounded px-3 py-2"
        placeholder="Add task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}
