import { useState } from "react";
import { ChevronDown } from "lucide-react";

const weeklyData = [
  { day: "Mon", completed: 5, created: 3 },
  { day: "Tue", completed: 8, created: 4 },
  { day: "Wed", completed: 6, created: 5 },
  { day: "Thu", completed: 10, created: 3 },
  { day: "Fri", completed: 7, created: 4 },
  { day: "Sat", completed: 4, created: 2 },
  { day: "Sun", completed: 6, created: 3 },
];

export default function WeeklyChart() {
  const [period, setPeriod] = useState("This week");

  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-ink-950">
            Productivity overview
          </h2>
          <p className="mt-1 text-xs text-ink-500">
            Your task activity throughout the week
          </p>
        </div>

        <label className="relative">
          <span className="sr-only">Chart period</span>
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className="h-9 appearance-none rounded-lg border border-line bg-white py-1 pl-3 pr-8 text-xs font-semibold text-ink-600 outline-none focus:border-brand-500"
          >
            <option>This week</option>
            <option>Last 7 days</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-500"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-brand-600" />
          Completed
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-violet-200" />
          Created
        </span>
      </div>

      <div
        className="mt-5 grid grid-cols-7 gap-2 sm:gap-4"
        role="img"
        aria-label="Illustrative weekly chart comparing completed tasks and newly created tasks"
      >
        {weeklyData.map((item) => {
          const completedHeight = (item.completed / 12) * 100;
          const createdHeight = (item.created / 12) * 100;

          return (
            <div key={item.day} className="flex min-w-0 flex-col items-center">
              <div className="flex h-40 w-full items-end justify-center gap-1 border-b border-slate-100 pb-0.5 sm:gap-1.5">
                <div
                  title={`${item.completed} completed`}
                  className="w-full max-w-5 rounded-t-md bg-brand-600 transition-all duration-300 hover:bg-brand-700"
                  style={{ height: `${completedHeight}%` }}
                />
                <div
                  title={`${item.created} created`}
                  className="w-full max-w-5 rounded-t-md bg-violet-200 transition-all duration-300 hover:bg-violet-300"
                  style={{ height: `${createdHeight}%` }}
                />
              </div>
              <span className="mt-3 text-[10px] font-medium text-ink-500 sm:text-xs">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] leading-5 text-slate-400">
        Sample activity for layout preview. We'll connect the chart to your
        tasks later.
      </p>
    </section>
  );
}
