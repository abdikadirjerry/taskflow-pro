import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodo,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import AppLayout from "./components/layout/AppLayout";
import StatCard from "./components/dashboard/StatCard";
import WeeklyChart from "./components/dashboard/WeeklyChart";
import PriorityBreakdown from "./components/dashboard/PriorityBreakdown";
import ActivityFeed from "./components/dashboard/ActivityFeed";
import PageSection from "./components/ui/PageSection";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import TaskForm from "./components/tasks/TaskForm";
import TaskList from "./components/tasks/TaskList";
import TaskFilters from "./components/tasks/TaskFilters";
import SettingsPanel from "./components/settings/SettingsPanel";
import { initialTasks } from "./data/initialTasks";
import usePersistentTasks from "./hooks/usePersistentTasks";
import usePersistentSettings, {
  DEFAULT_SETTINGS,
} from "./hooks/usePersistentSettings";
import {
  createTask,
  getLocalDateString,
  getTasksDueToday,
  TASK_STATUSES,
} from "./utils/taskHelpers";

const initialFilters = {
  search: "",
  status: "all",
  priority: "all",
  category: "all",
  sort: "newest",
};

const priorityRank = { high: 3, medium: 2, low: 1 };

function getFormattedDate() {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

function sortTasks(tasks, sort) {
  const sorted = [...tasks];

  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

    case "dueDate":
      return sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });

    case "priority":
      return sorted.sort(
        (a, b) =>
          (priorityRank[b.priority] ?? 0) - (priorityRank[a.priority] ?? 0),
      );

    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

export default function App() {
  const [tasks, setTasks] = usePersistentTasks(initialTasks);
  const [settings, setSettings] = usePersistentSettings();
  const [activePage, setActivePage] = useState(() => settings.defaultView);
  const [filters, setFilters] = useState(initialFilters);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const today = getLocalDateString();

  const pageTasks = useMemo(() => {
    let result = tasks;

    if (!settings.showCompletedTasks) {
      result = result.filter((task) => task.status !== TASK_STATUSES.COMPLETED);
    }

    if (activePage === "Today") {
      return result.filter(
        (task) =>
          task.status !== TASK_STATUSES.COMPLETED &&
          task.dueDate &&
          task.dueDate <= today,
      );
    }

    if (activePage === "Upcoming") {
      return result.filter(
        (task) =>
          task.status !== TASK_STATUSES.COMPLETED &&
          task.dueDate &&
          task.dueDate > today,
      );
    }

    return result;
  }, [tasks, activePage, today, settings.showCompletedTasks]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    const matchingTasks = pageTasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        (task.description ?? "").toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        filters.status === "all" || task.status === filters.status;

      const matchesPriority =
        filters.priority === "all" || task.priority === filters.priority;

      const matchesCategory =
        filters.category === "all" || task.category === filters.category;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesCategory
      );
    });

    return sortTasks(matchingTasks, filters.sort);
  }, [pageTasks, filters]);

  const completedCount = tasks.filter(
    (task) => task.status === TASK_STATUSES.COMPLETED,
  ).length;

  const inProgressCount = tasks.filter(
    (task) => task.status === TASK_STATUSES.IN_PROGRESS,
  ).length;

  const dueTodayCount = getTasksDueToday(tasks).length;

  const dashboardStats = [
    {
      title: "Total tasks",
      value: String(tasks.length),
      description: "Tasks in your workspace",
      icon: ListTodo,
      tone: "indigo",
      progress: tasks.length
        ? Math.round((completedCount / tasks.length) * 100)
        : 0,
    },
    {
      title: "Completed",
      value: String(completedCount).padStart(2, "0"),
      description: "Keep up the great work",
      icon: CheckCircle2,
      tone: "emerald",
      change: { direction: "up", label: "Progress" },
    },
    {
      title: "In progress",
      value: String(inProgressCount).padStart(2, "0"),
      description: "Ready for your attention",
      icon: Clock3,
      tone: "amber",
    },
    {
      title: "Due today",
      value: String(dueTodayCount).padStart(2, "0"),
      description: "Uncompleted tasks due today",
      icon: CalendarDays,
      tone: "violet",
    },
  ];

  function navigateTo(page) {
    setActivePage(page);
    setFilters(initialFilters);
    setSuccessMessage("");
  }

  function openCreateModal() {
    setSuccessMessage("");
    setEditingTask(null);
    setIsCreateModalOpen(true);
  }

  function handleCreateTask(taskInput) {
    const newTask = createTask(taskInput);
    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setIsCreateModalOpen(false);
    setSuccessMessage(`"${newTask.title}" was created successfully.`);
  }

  function openEditModal(task) {
    setSuccessMessage("");
    setIsCreateModalOpen(false);
    setEditingTask(task);
  }

  function handleUpdateTask(taskInput) {
    if (!editingTask) return;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...taskInput } : task,
      ),
    );

    setSuccessMessage(`"${taskInput.title}" was updated successfully.`);
    setEditingTask(null);
  }

  function handleDeleteTask() {
    if (!deletingTask) return;

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== deletingTask.id),
    );

    setSuccessMessage(`"${deletingTask.title}" was deleted.`);
    setDeletingTask(null);
  }

  function updateTaskStatus(task, nextStatus) {
    if (!Object.values(TASK_STATUSES).includes(nextStatus)) return;

    setTasks((currentTasks) =>
      currentTasks.map((currentTask) => {
        if (currentTask.id !== task.id) return currentTask;

        return {
          ...currentTask,
          status: nextStatus,
          completedAt:
            nextStatus === TASK_STATUSES.COMPLETED
              ? (currentTask.completedAt ?? new Date().toISOString())
              : null,
        };
      }),
    );

    const statusLabel = {
      [TASK_STATUSES.TODO]: "To do",
      [TASK_STATUSES.IN_PROGRESS]: "In progress",
      [TASK_STATUSES.COMPLETED]: "Completed",
    }[nextStatus];

    setSuccessMessage(`"${task.title}" moved to ${statusLabel}.`);
  }

  function handleToggleComplete(task) {
    const nextStatus =
      task.status === TASK_STATUSES.COMPLETED
        ? TASK_STATUSES.TODO
        : TASK_STATUSES.COMPLETED;

    updateTaskStatus(task, nextStatus);
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  function resetSettings() {
    setSettings({ ...DEFAULT_SETTINGS });
    setActivePage(DEFAULT_SETTINGS.defaultView);
    setFilters(initialFilters);
    setSuccessMessage("Your preferences have been reset.");
  }

  const isTaskPage = ["All Tasks", "Today", "Upcoming"].includes(activePage);

  return (
    <>
      <AppLayout
        activePage={activePage}
        onNavigate={navigateTo}
        onCreateTask={openCreateModal}
        displayName={settings.displayName}
      >
        <div className="space-y-8">
          {successMessage && (
            <div
              role="status"
              className="flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <span className="flex items-start gap-2">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{successMessage}</span>
              </span>

              <button
                type="button"
                aria-label="Dismiss success message"
                onClick={() => setSuccessMessage("")}
                className="rounded-md p-1 transition hover:bg-emerald-100"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {activePage === "Overview" && (
            <>
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-brand-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-200/40 sm:p-8 lg:p-9">
                <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border-[40px] border-white/5" />
                <div className="pointer-events-none absolute -bottom-32 right-36 size-64 rounded-full bg-white/5 blur-2xl" />

                <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-medium text-indigo-100">
                      <CalendarDays size={15} />
                      {getFormattedDate()}
                    </div>

                    <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                      Make today
                      <br className="sm:hidden" /> count.
                    </h2>

                    <p className="mt-3 max-w-lg text-sm leading-7 text-indigo-100">
                      Plan your priorities, focus on meaningful work, and turn
                      your goals into progress — one task at a time.
                    </p>
                  </div>

                  <Button
                    onClick={openCreateModal}
                    variant="secondary"
                    size="lg"
                    leftIcon={<Plus size={18} />}
                    rightIcon={<Sparkles size={15} />}
                    className="relative self-start border-transparent text-brand-700 lg:self-auto"
                  >
                    Create a task
                  </Button>
                </div>
              </section>

              <PageSection
                eyebrow="YOUR PROGRESS"
                title="Productivity at a glance"
                description="A quick look at how your work is progressing."
                action={
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    Live task counts
                  </span>
                }
              >
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {dashboardStats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                  ))}
                </div>
              </PageSection>

              <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,1fr)]">
                <WeeklyChart />
                <PriorityBreakdown />
              </div>

              <PageSection
                title="Recent tasks"
                description="A quick look at tasks in your workspace."
                action={
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigateTo("All Tasks")}
                  >
                    View all tasks
                  </Button>
                }
              >
                <div className="space-y-4">
                  <TaskFilters
                    filters={filters}
                    onChange={setFilters}
                    onReset={resetFilters}
                    resultCount={filteredTasks.length}
                    totalCount={pageTasks.length}
                  />

                  <TaskList
                    tasks={filteredTasks.slice(0, 5)}
                    onEdit={openEditModal}
                    onDelete={setDeletingTask}
                    onCreate={openCreateModal}
                    onToggleComplete={handleToggleComplete}
                    onStatusChange={updateTaskStatus}
                  />
                </div>
              </PageSection>

              <PageSection
                title="Workspace activity"
                description="A snapshot of your recent work and updates."
              >
                <ActivityFeed />
              </PageSection>
            </>
          )}

          {isTaskPage && (
            <PageSection
              eyebrow={
                activePage === "Today"
                  ? "DAILY FOCUS"
                  : activePage === "Upcoming"
                    ? "PLAN AHEAD"
                    : "YOUR WORKSPACE"
              }
              title={
                activePage === "Today"
                  ? "Today's focus"
                  : activePage === "Upcoming"
                    ? "Coming up next"
                    : "All your tasks"
              }
              description={
                activePage === "Today"
                  ? "Overdue and due-today tasks that still need attention."
                  : activePage === "Upcoming"
                    ? "Your unfinished tasks with future deadlines."
                    : "Search, filter, sort, and manage every task."
              }
              action={
                <Button
                  onClick={openCreateModal}
                  size="sm"
                  leftIcon={<Plus size={15} />}
                >
                  New task
                </Button>
              }
            >
              <div className="space-y-4">
                <TaskFilters
                  filters={filters}
                  onChange={setFilters}
                  onReset={resetFilters}
                  resultCount={filteredTasks.length}
                  totalCount={pageTasks.length}
                />

                <TaskList
                  tasks={filteredTasks}
                  onEdit={openEditModal}
                  onDelete={setDeletingTask}
                  onCreate={openCreateModal}
                  onToggleComplete={handleToggleComplete}
                  onStatusChange={updateTaskStatus}
                />
              </div>
            </PageSection>
          )}

          {activePage === "Settings" && (
            <SettingsPanel
              settings={settings}
              onChange={setSettings}
              onReset={resetSettings}
            />
          )}

          {activePage === "Help & Support" && (
            <section className="rounded-2xl border border-line bg-white p-8 text-center shadow-card">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-brand-600">
                <CheckCircle2 size={22} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-ink-950">
                Welcome to TaskFlow Pro
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-500">
                Create tasks, set priorities and deadlines, track completion,
                and use search and filters to stay organized.
              </p>
              <Button className="mt-5" onClick={() => navigateTo("All Tasks")}>
                Explore your tasks
              </Button>
            </section>
          )}
        </div>
      </AppLayout>

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create a new task"
        description="Capture what needs to get done and decide when it matters."
        size="lg"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalOpen(false)}
          submitLabel="Create task"
        />
      </Modal>

      <Modal
        open={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        title="Edit task"
        description="Update the details and keep your task information accurate."
        size="lg"
      >
        {editingTask && (
          <TaskForm
            key={editingTask.id}
            initialValues={{
              title: editingTask.title,
              description: editingTask.description ?? "",
              priority: editingTask.priority,
              category: editingTask.category,
              dueDate: editingTask.dueDate ?? "",
            }}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
            submitLabel="Save changes"
          />
        )}
      </Modal>

      <Modal
        open={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        title="Delete this task?"
        description="This action cannot be undone."
        size="sm"
      >
        {deletingTask && (
          <div>
            <p className="break-words rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-800">
              {deletingTask.title}
            </p>

            <p className="mt-3 text-sm leading-6 text-ink-500">
              Are you sure you want to permanently remove this task from your
              workspace?
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={() => setDeletingTask(null)}>
                Cancel
              </Button>

              <Button variant="danger" onClick={handleDeleteTask}>
                Delete task
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
