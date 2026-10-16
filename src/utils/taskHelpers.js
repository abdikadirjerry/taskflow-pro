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

export function getTaskProgress(tasks) {
  if (tasks.length === 0) {
    return 0;
  }

  const completedCount = tasks.filter(isTaskCompleted).length;

  return Math.round((completedCount / tasks.length) * 100);
}

export function getTasksDueToday(tasks) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;

  return tasks.filter(
    (task) =>
      task.dueDate === todayString && task.status !== TASK_STATUSES.COMPLETED,
  );
}
