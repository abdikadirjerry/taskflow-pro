import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Check,
  Flag,
  Tag,
  Text,
} from "lucide-react";
import Button from "../ui/Button";
import { TASK_CATEGORIES, TASK_PRIORITIES } from "../../utils/taskHelpers";

const priorityOptions = [
  {
    value: TASK_PRIORITIES.LOW,
    label: "Low",
    description: "Can wait",
    active: "border-emerald-400 bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  {
    value: TASK_PRIORITIES.MEDIUM,
    label: "Medium",
    description: "Normal priority",
    active: "border-amber-400 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  {
    value: TASK_PRIORITIES.HIGH,
    label: "High",
    description: "Needs attention",
    active: "border-rose-400 bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
  },
];

const initialForm = {
  title: "",
  description: "",
  priority: TASK_PRIORITIES.MEDIUM,
  category: "Personal",
  dueDate: "",
};

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function TaskForm({
  onSubmit,
  onCancel,
  initialValues,
  submitLabel = "Create task",
}) {
  const [form, setForm] = useState(() => ({
    ...initialForm,
    ...initialValues,
    dueDate: initialValues?.dueDate ?? "",
  }));
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSubmitError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    const trimmedTitle = form.title.trim();

    if (!trimmedTitle) {
      nextErrors.title = "Please enter a task title.";
    } else if (trimmedTitle.length > 100) {
      nextErrors.title = "Keep the title under 100 characters.";
    }

    if (form.description.trim().length > 500) {
      nextErrors.description = "Keep the description under 500 characters.";
    }

    if (form.dueDate && form.dueDate < getTodayDate()) {
      nextErrors.dueDate = "Choose today or a future date.";
    }

    if (!TASK_CATEGORIES.includes(form.category)) {
      nextErrors.category = "Choose a valid category.";
    }

    if (!Object.values(TASK_PRIORITIES).includes(form.priority)) {
      nextErrors.priority = "Choose a valid priority.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      onSubmit({
        title: trimmedTitle,
        description: form.description.trim(),
        priority: form.priority,
        category: form.category,
        dueDate: form.dueDate || null,
      });
    } catch {
      setSubmitError("We could not save your task. Please try again.");
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-ink-950 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10";

  const labelClass = "text-xs font-bold text-ink-800";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="task-title" className={labelClass}>
          Task title <span className="text-rose-500">*</span>
        </label>

        <input
          id="task-title"
          name="title"
          type="text"
          autoFocus
          maxLength={100}
          value={form.title}
          onChange={updateField}
          placeholder="e.g. Finish the React dashboard"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "task-title-error" : undefined}
          className={`${fieldClass} ${
            errors.title
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
              : ""
          }`}
        />

        <div className="mt-1.5 flex items-center justify-between gap-3">
          {errors.title ? (
            <p
              id="task-title-error"
              role="alert"
              className="text-xs text-rose-600"
            >
              {errors.title}
            </p>
          ) : (
            <span className="text-xs text-ink-500">
              Give your task a clear name.
            </span>
          )}

          <span className="shrink-0 text-[10px] text-slate-400">
            {form.title.length}/100
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="task-description" className={labelClass}>
          Description{" "}
          <span className="font-normal text-ink-500">(optional)</span>
        </label>

        <div className="relative">
          <Text
            size={17}
            className="absolute left-3.5 top-4 text-slate-400"
            aria-hidden="true"
          />

          <textarea
            id="task-description"
            name="description"
            rows={3}
            maxLength={500}
            value={form.description}
            onChange={updateField}
            placeholder="Add details to help you complete this task..."
            aria-invalid={Boolean(errors.description)}
            className={`${fieldClass} resize-y pl-10 ${
              errors.description ? "border-rose-400" : ""
            }`}
          />
        </div>

        <div className="mt-1.5 flex justify-between gap-3">
          {errors.description ? (
            <p role="alert" className="text-xs text-rose-600">
              {errors.description}
            </p>
          ) : (
            <span className="text-xs text-ink-500">Add context if needed.</span>
          )}

          <span className="shrink-0 text-[10px] text-slate-400">
            {form.description.length}/500
          </span>
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>
          <span className="inline-flex items-center gap-1.5">
            <Flag size={14} />
            Priority
          </span>
        </legend>

        <div className="mt-2 grid grid-cols-3 gap-2">
          {priorityOptions.map((option) => {
            const selected = form.priority === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    priority: option.value,
                  }))
                }
                className={`min-w-0 rounded-xl border p-3 text-left transition ${
                  selected
                    ? option.active
                    : "border-line bg-white text-ink-600 hover:bg-canvas"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className={`size-2 rounded-full ${option.dot}`} />
                  <span className="text-xs font-bold">{option.label}</span>
                  {selected && <Check size={13} className="ml-auto" />}
                </span>

                <span className="mt-1.5 block text-[10px] opacity-80">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>

        {errors.priority && (
          <p role="alert" className="mt-1 text-xs text-rose-600">
            {errors.priority}
          </p>
        )}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="task-category" className={labelClass}>
            <span className="inline-flex items-center gap-1.5">
              <Tag size={14} />
              Category
            </span>
          </label>

          <select
            id="task-category"
            name="category"
            value={form.category}
            onChange={updateField}
            aria-invalid={Boolean(errors.category)}
            className={fieldClass}
          >
            {TASK_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {errors.category && (
            <p role="alert" className="mt-1 text-xs text-rose-600">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="task-due-date" className={labelClass}>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              Due date
            </span>
          </label>

          <input
            id="task-due-date"
            name="dueDate"
            type="date"
            min={getTodayDate()}
            value={form.dueDate}
            onChange={updateField}
            aria-invalid={Boolean(errors.dueDate)}
            className={`${fieldClass} ${
              errors.dueDate ? "border-rose-400" : ""
            }`}
          />

          {errors.dueDate && (
            <p role="alert" className="mt-1 text-xs text-rose-600">
              {errors.dueDate}
            </p>
          )}
        </div>
      </div>

      {submitError && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-rose-50 p-3 text-xs leading-5 text-rose-700"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {submitError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 border-t border-line pt-5 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" leftIcon={<Check size={17} />}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
