import { useEffect, useState } from "react";

const STORAGE_KEY = "taskflow-pro-tasks";

function isValidTaskList(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (task) =>
        task &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.status === "string",
    )
  );
}

function loadTasks(fallbackTasks) {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks === null) {
      return fallbackTasks;
    }

    const parsedTasks = JSON.parse(savedTasks);

    return isValidTaskList(parsedTasks) ? parsedTasks : fallbackTasks;
  } catch {
    return fallbackTasks;
  }
}

export default function usePersistentTasks(initialTasks) {
  const [tasks, setTasks] = useState(() => loadTasks(initialTasks));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error(
        "TaskFlow Pro could not save tasks to local storage.",
        error,
      );
    }
  }, [tasks]);

  return [tasks, setTasks];
}
