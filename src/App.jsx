import { useState } from "react";
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
import { initialTasks } from "./data/initialTasks";
import { createTask } from "./utils/taskHelpers";

const dashboardStats = [
  {
    title: "Total tasks",
    value: "12",
    description: "Tasks in your workspace",
    icon: ListTodo,
    tone: "indigo",
    progress: 75,
  },
  {
    title: "Completed",
    value: "04",
    description: "Keep up the great work",
    icon: CheckCircle2,
    tone: "emerald",
    change: { direction: "up", label: "33%" },
  },
  {
    title: "In progress",
    value: "08",
    description: "Ready for your attention",
    icon: Clock3,
    tone: "amber",
  },
  {
    title: "Due today",
    value: "03",
    description: "Make time for these",
    icon: CalendarDays,
    tone: "violet",
  },
];

function getFormattedDate() {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleCreateTask(taskInput) {
    const newTask = createTask(taskInput);

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setIsCreateModalOpen(false);
    setSuccessMessage(`"${newTask.title}" was created successfully.`);
  }

  function openCreateModal() {
    setSuccessMessage("");
    setIsCreateModalOpen(true);
  }

  return (
    <>
      <AppLayout onCreateTask={openCreateModal}>
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
                  Plan your priorities, focus on meaningful work, and turn your
                  goals into progress — one task at a time.
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
                <span className="size-2 rounded-full bg-amber-400" />
                Preview data
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
            title="Workspace activity"
            description="A snapshot of your recent work and updates."
          >
            <ActivityFeed />
          </PageSection>

          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-sm font-bold text-ink-950">
                Ready to make progress?
              </h2>
              <p className="mt-1 text-xs leading-5 text-ink-500">
                You currently have {tasks.length} tasks in application state.
              </p>
            </div>

            <Button
              onClick={openCreateModal}
              leftIcon={<Plus size={17} />}
              className="self-start sm:self-auto"
            >
              Add a task
            </Button>
          </section>
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
        />
      </Modal>
    </>
  );
}
