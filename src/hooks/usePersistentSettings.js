import { useEffect, useState } from "react";

const STORAGE_KEY = "taskflow-pro-settings";

export const DEFAULT_SETTINGS = {
  displayName: "there",
  defaultView: "Overview",
  showCompletedTasks: true,
  weekStartsOn: "monday",
};

const VALID_VIEWS = ["Overview", "All Tasks", "Today", "Upcoming"];

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(saved);

    return {
      ...DEFAULT_SETTINGS,
      ...(parsed && typeof parsed === "object" ? parsed : {}),
      displayName:
        typeof parsed?.displayName === "string"
          ? parsed.displayName
          : DEFAULT_SETTINGS.displayName,
      defaultView: VALID_VIEWS.includes(parsed?.defaultView)
        ? parsed.defaultView
        : DEFAULT_SETTINGS.defaultView,
      showCompletedTasks:
        typeof parsed?.showCompletedTasks === "boolean"
          ? parsed.showCompletedTasks
          : DEFAULT_SETTINGS.showCompletedTasks,
      weekStartsOn: parsed?.weekStartsOn === "sunday" ? "sunday" : "monday",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export default function usePersistentSettings() {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("TaskFlow Pro could not save settings.", error);
    }
  }, [settings]);

  return [settings, setSettings];
}
