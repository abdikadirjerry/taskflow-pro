import { AlertCircle, ArrowUp, Minus, ArrowDown } from "lucide-react";

const priorities = [
  {
    label: "High priority",
    count: 4,
    percentage: 40,
    icon: AlertCircle,
    color: "bg-rose-500",
    iconColor: "text-rose-600",
    track: "bg-rose-50",
  },
  {
    label: "Medium priority",
    count: 4,
    percentage: 40,
    icon: Minus,
    color: "bg-amber-500",
    iconColor: "text-amber-600",
    track: "bg-amber-50",
  },
  {
    label: "Low priority",
    count: 2,
    percentage: 20,
    icon: ArrowDown,
    color: "bg-emerald-500",
    iconColor: "text-emerald-600",
    track: "bg-emerald-50",
  },
];

export default function PriorityBreakdown() {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div>
        <h2 className="text-base font-bold text-ink-950">Priority breakdown</h2>
        <p className="mt-1 text-xs text-ink-500">
          Where your attention is needed
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {priorities.map((priority) => {
          const Icon = priority.icon;

          return (
            <div key={priority.label}>
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${priority.track} ${priority.iconColor}`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="truncate text-xs font-semibold text-ink-800">
                    {priority.label}
                  </span>
                </div>

                <span className="shrink-0 text-xs font-bold text-ink-950">
                  {priority.count}
                </span>
              </div>

              <div
                className="h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={priority.label}
                aria-valuenow={priority.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${priority.color}`}
                  style={{ width: `${priority.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-7 rounded-xl bg-canvas p-3.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-800">
          <ArrowUp size={15} className="text-brand-600" />
          Focus on what matters
        </div>
        <p className="mt-1.5 text-xs leading-5 text-ink-500">
          Start with your highest-priority tasks to make meaningful progress.
        </p>
      </div>
    </section>
  );
}
