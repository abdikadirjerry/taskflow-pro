import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "indigo",
  change,
  progress,
}) {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
  };

  const safeProgress =
    typeof progress === "number" ? Math.min(100, Math.max(0, progress)) : null;

  return (
    <article className="min-w-0 rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-floating sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink-500">{title}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink-950">
            {value}
          </p>
        </div>

        {Icon && (
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
              tones[tone] ?? tones.indigo
            }`}
          >
            <Icon size={21} strokeWidth={1.9} />
          </span>
        )}
      </div>

      <div className="mt-4 flex min-h-5 flex-wrap items-center gap-2">
        {change && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-bold ${
              change.direction === "down" ? "text-rose-600" : "text-emerald-600"
            }`}
          >
            {change.direction === "down" ? (
              <ArrowDownRight size={14} />
            ) : (
              <ArrowUpRight size={14} />
            )}
            {change.label}
          </span>
        )}

        {description && (
          <span className="text-xs text-ink-500">{description}</span>
        )}
      </div>

      {safeProgress !== null && (
        <div className="mt-4">
          <div
            className="h-1.5 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label={`${title} progress`}
            aria-valuenow={safeProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-brand-600 transition-all duration-500"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        </div>
      )}
    </article>
  );
}
