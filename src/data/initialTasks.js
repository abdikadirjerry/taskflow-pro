function getDateOffset(daysFromToday) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const today = getDateOffset(0);
const tomorrow = getDateOffset(1);
const inTwoDays = getDateOffset(2);
const inThreeDays = getDateOffset(3);
const inFiveDays = getDateOffset(5);
const yesterday = getDateOffset(-1);

export const initialTasks = [
  {
    id: "task-001",
    title: "Review project requirements",
    description:
      "Review the project scope, define deliverables, and identify the most important priorities.",
    status: "completed",
    priority: "high",
    category: "Work",
    dueDate: yesterday,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "task-002",
    title: "Complete React practice",
    description:
      "Practice reusable components, props, state, and event handling by building a small feature.",
    status: "in-progress",
    priority: "high",
    category: "Learning",
    dueDate: today,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    completedAt: null,
  },
  {
    id: "task-003",
    title: "Plan the weekly schedule",
    description:
      "Organize learning sessions, project work, revision, and personal commitments.",
    status: "todo",
    priority: "medium",
    category: "Personal",
    dueDate: today,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: null,
  },
  {
    id: "task-004",
    title: "Build the task creation form",
    description:
      "Create a form with title, description, priority, category, and due date fields.",
    status: "todo",
    priority: "high",
    category: "Work",
    dueDate: tomorrow,
    createdAt: new Date().toISOString(),
    completedAt: null,
  },
  {
    id: "task-005",
    title: "Study JavaScript array methods",
    description:
      "Review map, filter, find, some, every, and reduce with practical exercises.",
    status: "in-progress",
    priority: "medium",
    category: "Learning",
    dueDate: inTwoDays,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: null,
  },
  {
    id: "task-006",
    title: "Update portfolio README",
    description:
      "Document the project setup, features, technology stack, and development workflow.",
    status: "todo",
    priority: "low",
    category: "Work",
    dueDate: inThreeDays,
    createdAt: new Date().toISOString(),
    completedAt: null,
  },
  {
    id: "task-007",
    title: "Review weekly progress",
    description:
      "Reflect on completed work, identify blockers, and plan improvements for next week.",
    status: "todo",
    priority: "medium",
    category: "Personal",
    dueDate: inFiveDays,
    createdAt: new Date().toISOString(),
    completedAt: null,
  },
  {
    id: "task-008",
    title: "Organize learning resources",
    description:
      "Group useful documentation, tutorials, and coding exercises by topic.",
    status: "completed",
    priority: "low",
    category: "Learning",
    dueDate: today,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
