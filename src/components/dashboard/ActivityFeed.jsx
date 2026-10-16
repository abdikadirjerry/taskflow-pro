import { CheckCircle2, CirclePlus, Pencil, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";

const activities = [
  {
    id: 1,
    title: "Completed a task",
    detail: "Review project requirements",
    time: "10 minutes ago",
    icon: CheckCircle2,
    tone: "text-emerald-600 bg-emerald-50",
    status: "Completed",
    variant: "success",
  },
  {
    id: 2,
    title: "Created a new task",
    detail: "Prepare weekly priorities",
    time: "35 minutes ago",
    icon: CirclePlus,
    tone: "text-indigo-600 bg-indigo-50",
    status: "Created",
    variant: "primary",
  },
  {
    id: 3,
    title: "Updated task details",
    detail: "Plan next learning session",
    time: "1 hour ago",
    icon: Pencil,
    tone: "text-amber-600 bg-amber-50",
    status: "Updated",
    variant: "warning",
  },
];

export default function ActivityFeed() {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-ink-950">Recent activity</h2>
          <p className="mt-1 text-xs text-ink-500">
            Your latest workspace updates
          </p>
        </div>
        <span className="rounded-lg bg-canvas px-2.5 py-1.5 text-[10px] font-semibold text-ink-500">
          Recent
        </span>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <article
              key={activity.id}
              className="flex gap-3 py-4 first:pt-0 last:pb-0"
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${activity.tone}`}
              >
                <Icon size={17} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold text-ink-800">
                    {activity.title}
                  </p>
                  <Badge variant={activity.variant} size="sm">
                    {activity.status}
                  </Badge>
                </div>

                <p className="mt-1 truncate text-xs text-ink-500">
                  {activity.detail}
                </p>
                <p className="mt-2 text-[10px] text-slate-400">
                  {activity.time}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[11px] text-slate-400">
        <Trash2 size={13} />
        Activity history will become dynamic in a later feature.
      </div>
    </section>
  );
}
