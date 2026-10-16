import { ListTodo, Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import EmptyState from "../ui/EmptyState";
import Button from "../ui/Button";

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onCreate,
  onToggleComplete,
  onStatusChange,
}) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title="No tasks found"
        description="Try changing your search or filters, or create a new task to get started."
        actionLabel="Create a task"
        onAction={onCreate}
        className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12"
      />
    );
  }

  return (
    <section aria-label="Task results" className="space-y-3">
      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-xs font-medium text-ink-500">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} displayed
        </p>

        <Button
          size="sm"
          variant="outline"
          onClick={onCreate}
          leftIcon={<Plus size={14} />}
        >
          New task
        </Button>
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="min-w-0">
            <TaskCard
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              onStatusChange={onStatusChange}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
