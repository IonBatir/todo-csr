import { type Task } from "../types/Task";

type Props = Readonly<{
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}>;

export default function TaskList({ tasks, onUpdate, onDelete }: Props) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center border rounded px-3 py-2"
        >
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onUpdate({ ...task, completed: !task.completed })}
            />
            <span
              className={task.completed ? "line-through text-gray-500" : ""}
            >
              {task.title}
            </span>
          </label>
          <button onClick={() => onDelete(task.id)} className="text-red-500">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
