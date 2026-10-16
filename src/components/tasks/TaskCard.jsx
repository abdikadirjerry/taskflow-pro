import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Edit3,
  Flag,
  Trash2,
} from "lucide-react";
import Badge from "../ui/Badge";
import { TASK_STATUSES } from "../../utils/taskHelpers";

const priorityStyles = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

const statusLabels = {
  [TASK_STATUSES.TODO]: "To do",
  [TASK_STATUSES.IN_PROGRESS]: "In progress",
  [TASK_STATUSES.COMPLETED]: "Completed",
};

const statusStyles = {
  [TASK_STATUSES.TODO]: "outline",
  [TASK_STATUSES.IN_PROGRESS]: "warning",
  [TASK_STATUSES.COMPLETED]: "success",
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

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
}) {
  const isCompleted = task.status === TASK_STATUSES.COMPLETED;

  return (
    <article
      className={`rounded-2xl border bg-white p-4 shadow-card transition hover:border-indigo-200 hover:shadow-md sm:p-5 ${
        isCompleted ? "border-emerald-100 bg-emerald-50/20" : "border-line"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggleComplete(task)}
          aria-label={
            isCompleted
              ? `Mark ${task.title} as not completed`
              : `Mark ${task.title} as completed`
          }
          aria-pressed={isCompleted}
          title={isCompleted ? "Mark as not completed" : "Mark as completed"}
          className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 ${
            isCompleted
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-slate-300 text-transparent hover:border-brand-500 hover:text-brand-500"
          }`}
        >
          <Check size={14} strokeWidth={3} />
        </button>

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
            <p
              className={`mt-2 line-clamp-2 text-xs leading-5 ${
                isCompleted ? "text-slate-400" : "text-ink-500"
              }`}
            >
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

      <div className="mt-4 flex flex-col gap-2 border-t border-line/80 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-500">
          {isCompleted ? (
            <CheckCircle2 size={14} className="text-emerald-600" />
          ) : (
            <Clock3 size={14} />
          )}
          {isCompleted ? "Nice work — task completed" : "Update task status"}
        </span>

        <label className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-ink-500">Status</span>

          <select
            aria-label={`Change status for ${task.title}`}
            value={task.status}
            onChange={(event) => onStatusChange(task, event.target.value)}
            className="max-w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-semibold text-ink-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
          >
            <option value={TASK_STATUSES.TODO}>To do</option>
            <option value={TASK_STATUSES.IN_PROGRESS}>In progress</option>
            <option value={TASK_STATUSES.COMPLETED}>Completed</option>
          </select>
        </label>
      </div>
    </article>
  );
}
