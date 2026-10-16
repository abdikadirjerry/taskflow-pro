import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ListTodo,
  Sparkles,
} from "lucide-react";
import AppLayout from "./components/layout/AppLayout";

const previewCards = [
  {
    label: "Total tasks",
    value: "12",
    note: "Your workspace at a glance",
    icon: ListTodo,
    iconStyle: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Completed",
    value: "04",
    note: "Small wins matter",
    icon: CheckCircle2,
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "In progress",
    value: "08",
    note: "Keep up the momentum",
    icon: Clock3,
    iconStyle: "bg-amber-50 text-amber-600",
  },
];

export default function App() {
  function handleCreateTask() {
    window.alert("Task creation is coming in a future feature.");
  }

  return (
    <AppLayout onCreateTask={handleCreateTask}>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-brand-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-200/40 sm:p-9 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border-[40px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-32 right-36 size-64 rounded-full bg-white/5 blur-2xl" />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-50">
            <Sparkles size={14} />
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
            Make room for
            <br />
            what matters most.
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-indigo-100 sm:text-base">
            Organize your priorities, focus on meaningful work, and turn your
            plans into progress — one task at a time.
          </p>

          <button
            type="button"
            onClick={handleCreateTask}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
          >
            Create your first task
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-ink-950">Your overview</h2>
            <p className="mt-1 text-xs text-ink-500">
              A snapshot of your productivity workspace
            </p>
          </div>
          <span className="rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink-500">
            Preview data
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {previewCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.label}
                className="rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-floating sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-ink-500">
                      {card.label}
                    </p>
                    <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink-950">
                      {card.value}
                    </p>
                  </div>

                  <span
                    className={`flex size-11 items-center justify-center rounded-xl ${card.iconStyle}`}
                  >
                    <Icon size={21} />
                  </span>
                </div>

                <p className="mt-4 border-t border-line pt-4 text-xs text-ink-500">
                  {card.note}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-5 py-8 text-center sm:py-10">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-brand-600">
          <ListTodo size={23} />
        </span>
        <h2 className="mt-4 text-base font-bold text-ink-950">
          Your task list starts here
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink-500">
          Soon you’ll be able to create tasks, set priorities, organize
          deadlines, and track your progress from this workspace.
        </p>
      </section>
    </AppLayout>
  );
}
