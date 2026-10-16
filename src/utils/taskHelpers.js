export const TASK_STATUSES = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};

export const TASK_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const TASK_CATEGORIES = [
  "Work",
  "Personal",
  "Learning",
  "Health",
  "Other",
];

export function createTaskId() {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createTask(taskInput) {
  const now = new Date().toISOString();

  return {
    id: createTaskId(),
    title: taskInput.title.trim(),
    description: taskInput.description?.trim() ?? "",
    status: TASK_STATUSES.TODO,
    priority: taskInput.priority ?? TASK_PRIORITIES.MEDIUM,
    category: taskInput.category ?? "Personal",
    dueDate: taskInput.dueDate || null,
    createdAt: now,
    completedAt: null,
  };
}

export function isTaskCompleted(task) {
  return task.status === TASK_STATUSES.COMPLETED;
}

export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTaskDeadlineStatus(task, today = getLocalDateString()) {
  if (!task.dueDate) return "no-date";
  if (task.status === TASK_STATUSES.COMPLETED) return "completed";
  if (task.dueDate < today) return "overdue";
  if (task.dueDate === today) return "today";

  return "upcoming";
}

export function getTaskProgress(tasks) {
  if (tasks.length === 0) return 0;

  const completedCount = tasks.filter(isTaskCompleted).length;

  return Math.round((completedCount / tasks.length) * 100);
}

export function getTasksDueToday(tasks) {
  const today = getLocalDateString();

  return tasks.filter(
    (task) => task.dueDate === today && task.status !== TASK_STATUSES.COMPLETED,
  );
}

export function getOverdueTasks(tasks) {
  const today = getLocalDateString();

  return tasks.filter(
    (task) =>
      task.dueDate &&
      task.dueDate < today &&
      task.status !== TASK_STATUSES.COMPLETED,
  );
}
