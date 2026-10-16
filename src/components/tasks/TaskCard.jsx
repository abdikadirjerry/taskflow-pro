import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Flag,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import Badge from "../ui/Badge";

const priorityStyles = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

const statusLabels = {
  todo: "To do",
  "in-progress": "In progress",
  completed: "Completed",
};

const statusStyles = {
  todo: "outline",
  "in-progress": "warning",
  completed: "success",
};

function formatDueDate(dateString) {
  if (!dateString) return "No due date";

  const date = new Date(`${dateString}T12:00:00`);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function TaskCard({ task, onEdit, onDelete }) {
  const isCompleted = task.status === "completed";

  return (
    <article
      className={`group rounded-2xl border bg-white p-4 shadow-card transition hover:border-indigo-200 hover:shadow-md sm:p-5 ${
        isCompleted ? "border-emerald-100" : "border-line"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl ${
            isCompleted
              ? "bg-emerald-50 text-emerald-600"
              : "bg-indigo-50 text-brand-600"
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 size={18} />
          ) : task.status === "in-progress" ? (
            <Clock3 size={18} />
          ) : (
            <Flag size={18} />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`break-words text-sm font-bold ${
                isCompleted ? "text-ink-500 line-through" : "text-ink-950"
              }`}
            >
              {task.title}
            </h3>

            <Badge variant={statusStyles[task.status] ?? "default"} size="sm">
              {statusLabels[task.status] ?? task.status}
            </Badge>
          </div>

          {task.description && (
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-ink-500">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${
                priorityStyles[task.priority] ?? "bg-slate-100 text-slate-600"
              }`}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {task.priority} priority
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-ink-500">
              {task.category}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-ink-500">
              <CalendarDays size={12} />
              {formatDueDate(task.dueDate)}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            title="Edit task"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Edit3 size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task)}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
