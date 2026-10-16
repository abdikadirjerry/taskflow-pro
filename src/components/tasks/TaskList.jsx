import { ListTodo, Plus } from "lucide-react";
import Button from "../ui/Button";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onEdit, onDelete, onCreate }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-brand-600">
          <ListTodo size={25} />
        </span>

        <h3 className="mt-4 text-sm font-bold text-ink-950">
          No tasks to show
        </h3>

        <p className="mt-2 max-w-sm text-xs leading-5 text-ink-500">
          Create a task to start organizing your work and tracking your
          progress.
        </p>

        <Button
          onClick={onCreate}
          leftIcon={<Plus size={16} />}
          className="mt-5"
        >
          Create a task
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
