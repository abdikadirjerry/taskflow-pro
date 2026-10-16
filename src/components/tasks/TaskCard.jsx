import { useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  Flag,
  History,
  Trash2,
} from "lucide-react";
import Badge from "../ui/Badge";
import TaskDetailsModal from "./TaskDetailsModal";
import { TASK_STATUSES, getTaskDeadlineStatus } from "../../utils/taskHelpers";

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

const deadlineStyles = {
  overdue: "border-rose-200 bg-rose-50 text-rose-700",
  today: "border-amber-200 bg-amber-50 text-amber-800",
  upcoming: "border-slate-200 bg-slate-50 text-slate-600",
  "no-date": "border-slate-200 bg-slate-50 text-slate-500",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const deadlineLabels = {
  overdue: "Overdue",
  today: "Due today",
  upcoming: "Upcoming",
  "no-date": "No due date",
  completed: "Deadline met",
};

function formatDate(dateString) {
  if (!dateString) return null;

  const date = new Date(`${dateString}T12:00:00`);

  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTimestamp(timestamp) {
  if (!timestamp) return null;

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function IconAction({ label, title, onClick, children, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={title}
      className={`inline-flex size-10 items-center justify-center rounded-xl transition focus-visible:outline-none focus-visible:ring-4 ${
        danger
          ? "text-slate-400 hover:bg-rose-50 hover:text-rose-600 focus-visible:ring-rose-500/20"
          : "text-slate-400 hover:bg-indigo-50 hover:text-brand-600 focus-visible:ring-brand-500/20"
      }`}
    >
      {children}
    </button>
  );
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const isCompleted = task.status === TASK_STATUSES.COMPLETED;
  const deadlineStatus = getTaskDeadlineStatus(task);
  const createdDate = formatTimestamp(task.createdAt);
  const completedDate = formatTimestamp(task.completedAt);

  const dueDateText =
    deadlineStatus === "overdue"
      ? `Overdue · ${formatDate(task.dueDate)}`
      : deadlineStatus === "today"
        ? `Today · ${formatDate(task.dueDate)}`
        : deadlineStatus === "no-date"
          ? "No due date"
          : formatDate(task.dueDate);

  return (
    <>
      <article
        className={`min-w-0 rounded-2xl border bg-white p-4 shadow-card transition hover:shadow-md sm:p-5 ${
          deadlineStatus === "overdue"
            ? "border-rose-200"
            : isCompleted
              ? "border-emerald-100 bg-emerald-50/20"
              : "border-line hover:border-indigo-200"
        }`}
      >
        <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
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
            className={`mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 ${
              isCompleted
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-slate-300 text-transparent hover:border-brand-500 hover:text-brand-500"
            }`}
          >
            <Check size={14} strokeWidth={3} aria-hidden="true" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setDetailsOpen(true)}
                className={`min-w-0 break-words text-left text-sm font-bold transition hover:text-brand-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isCompleted ? "text-ink-500 line-through" : "text-ink-950"
                }`}
              >
                {task.title}
              </button>

              <Badge variant={statusStyles[task.status] ?? "default"} size="sm">
                {statusLabels[task.status] ?? task.status}
              </Badge>
            </div>

            {task.description && (
              <p
                className={`mt-2 break-words text-xs leading-5 ${
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

              <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-ink-500">
                {task.category || "Uncategorized"}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                  deadlineStyles[deadlineStatus]
                }`}
              >
                <CalendarDays size={12} aria-hidden="true" />
                {dueDateText}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-400">
              {createdDate && (
                <span className="inline-flex items-center gap-1">
                  <History size={11} aria-hidden="true" />
                  Created {createdDate}
                </span>
              )}

              {isCompleted && completedDate && (
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 size={11} aria-hidden="true" />
                  Completed {completedDate}
                </span>
              )}
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-0.5">
            <IconAction
              label={`View details for ${task.title}`}
              title="View details"
              onClick={() => setDetailsOpen(true)}
            >
              <Eye size={16} aria-hidden="true" />
            </IconAction>

            <IconAction
              label={`Edit ${task.title}`}
              title="Edit task"
              onClick={() => onEdit(task)}
            >
              <Edit3 size={16} aria-hidden="true" />
            </IconAction>

            <IconAction
              label={`Delete ${task.title}`}
              title="Delete task"
              onClick={() => onDelete(task)}
              danger
            >
              <Trash2 size={16} aria-hidden="true" />
            </IconAction>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-line/80 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-500">
            {isCompleted ? (
              <CheckCircle2 size={14} className="text-emerald-600" />
            ) : deadlineStatus === "overdue" ? (
              <Flag size={14} className="text-rose-600" />
            ) : (
              <Clock3 size={14} />
            )}

            {isCompleted
              ? "Nice work — task completed"
              : deadlineStatus === "overdue"
                ? "This task needs attention"
                : deadlineLabels[deadlineStatus]}
          </span>

          <label className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-ink-500">
              Status
            </span>

            <select
              aria-label={`Change status for ${task.title}`}
              value={task.status}
              onChange={(event) => onStatusChange(task, event.target.value)}
              className="min-h-10 max-w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-semibold text-ink-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            >
              <option value={TASK_STATUSES.TODO}>To do</option>
              <option value={TASK_STATUSES.IN_PROGRESS}>In progress</option>
              <option value={TASK_STATUSES.COMPLETED}>Completed</option>
            </select>
          </label>
        </div>
      </article>

      <TaskDetailsModal
        task={detailsOpen ? task : null}
        onClose={() => setDetailsOpen(false)}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
      />
    </>
  );
}
