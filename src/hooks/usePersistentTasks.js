import { useEffect, useState } from "react";

const STORAGE_KEY = "taskflow-pro-tasks";

function isValidTask(task) {
  return (
    task !== null &&
    typeof task === "object" &&
    typeof task.id === "string" &&
    task.id.length > 0 &&
    typeof task.title === "string" &&
    task.title.trim().length > 0 &&
    ["todo", "in-progress", "completed"].includes(task.status) &&
    ["low", "medium", "high"].includes(task.priority) &&
    typeof task.category === "string"
  );
}

function isValidTaskList(value) {
  return (
    Array.isArray(value) &&
    value.every(isValidTask) &&
    new Set(value.map((task) => task.id)).size === value.length
  );
}

function loadTasks(fallbackTasks) {
  try {
    const savedTasks = window.localStorage.getItem(STORAGE_KEY);

    if (savedTasks === null) {
      return fallbackTasks;
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (!isValidTaskList(parsedTasks)) {
      console.warn(
        "TaskFlow Pro found invalid saved task data. Using the initial tasks instead.",
      );
      return fallbackTasks;
    }

    return parsedTasks;
  } catch (error) {
    console.warn(
      "TaskFlow Pro could not read saved tasks. Using the initial tasks instead.",
      error,
    );

    return fallbackTasks;
  }
}

export default function usePersistentTasks(initialTasks) {
  const [tasks, setTasks] = useState(() => loadTasks(initialTasks));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error(
        "TaskFlow Pro could not save tasks. Your changes may not persist after refreshing.",
        error,
      );
    }
  }, [tasks]);

  return [tasks, setTasks];
}
