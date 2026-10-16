import { ListTodo } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  icon: Icon = ListTodo,
  title = "Nothing here yet",
  description = "When you add something, it will appear here.",
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-12 text-center sm:py-16 ${className}`}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-brand-600">
        <Icon size={25} strokeWidth={1.8} />
      </span>

      <h3 className="mt-5 text-base font-bold text-ink-950">{title}</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-ink-500">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
