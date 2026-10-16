import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Flag,
  Tag,
  X,
} from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { TASK_STATUSES } from "../../utils/taskHelpers";

const statusLabels = {
  [TASK_STATUSES.TODO]: "To do",
  [TASK_STATUSES.IN_PROGRESS]: "In progress",
  [TASK_STATUSES.COMPLETED]: "Completed",
};

const statusVariants = {
  [TASK_STATUSES.TODO]: "outline",
  [TASK_STATUSES.IN_PROGRESS]: "warning",
  [TASK_STATUSES.COMPLETED]: "success",
};

const priorityStyles = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

function formatDate(value, includeTime = false) {
  if (!value) return "Not available";

  const date = value.includes("T")
    ? new Date(value)
    : new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat(
    "en",
    includeTime
      ? {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }
      : {
          month: "long",
          day: "numeric",
          year: "numeric",
        },
  ).format(date);
}

function DetailItem({ icon: Icon, label, children }) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-line bg-slate-50/70 p-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
        <Icon size={17} />
      </span>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">
          {label}
        </p>
        <div className="mt-1 break-words text-sm font-semibold text-ink-800">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function TaskDetailsModal({
  task,
  onClose,
  onEdit,
  onStatusChange,
}) {
  if (!task) return null;

  const isCompleted = task.status === TASK_STATUSES.COMPLETED;

  function handleEdit() {
    onClose();
    onEdit(task);
  }

  return (
    <Modal
      open={Boolean(task)}
      onClose={onClose}
      title="Task details"
      description="Review the information and track your progress."
      size="lg"
    >
      <div className="space-y-5">
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-600">
                Task overview
              </p>

              <h2 className="mt-2 break-words text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl">
                {task.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close task details"
              className="shrink-0 rounded-xl p-2 text-ink-500 transition hover:bg-white hover:text-ink-950"
            >
              <X size={19} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={statusVariants[task.status] ?? "default"} size="md">
              {statusLabels[task.status] ?? task.status}
            </Badge>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold capitalize ${
                priorityStyles[task.priority] ?? "bg-slate-100 text-slate-600"
              }`}
            >
              <Flag size={13} />
              {task.priority} priority
            </span>
          </div>
        </div>

        <section>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-500">
            Description
          </h3>

          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-ink-600">
            {task.description || "No description has been added to this task."}
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-500">
            Task information
          </h3>

          <div className="grid gap-3 sm:grid-cols-2">
            <DetailItem icon={Tag} label="Category">
              {task.category || "Uncategorized"}
            </DetailItem>

            <DetailItem icon={CalendarDays} label="Due date">
              {task.dueDate ? formatDate(task.dueDate) : "No due date"}
            </DetailItem>

            <DetailItem icon={Clock3} label="Created">
              {formatDate(task.createdAt, true)}
            </DetailItem>

            <DetailItem icon={CheckCircle2} label="Completed">
              {task.completedAt
                ? formatDate(task.completedAt, true)
                : "Not completed yet"}
            </DetailItem>
          </div>
        </section>

        <section className="rounded-xl border border-line p-4">
          <label
            htmlFor="task-details-status"
            className="mb-2 block text-xs font-bold text-ink-600"
          >
            Update task status
          </label>

          <select
            id="task-details-status"
            value={task.status}
            onChange={(event) => onStatusChange(task, event.target.value)}
            className="w-full rounded-xl border border-line bg-white px-3 py-3 text-sm font-semibold text-ink-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
          >
            <option value={TASK_STATUSES.TODO}>To do</option>
            <option value={TASK_STATUSES.IN_PROGRESS}>In progress</option>
            <option value={TASK_STATUSES.COMPLETED}>Completed</option>
          </select>

          {isCompleted && (
            <p className="mt-2 text-xs leading-5 text-emerald-700">
              This task is completed. You can change its status if more work is
              needed.
            </p>
          )}
        </section>

        <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>

          <Button leftIcon={<Edit3 size={15} />} onClick={handleEdit}>
            Edit task
          </Button>
        </div>
      </div>
    </Modal>
  );
}
