import { ListTodo, Plus } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  icon: Icon = ListTodo,
  title = "Nothing here yet",
  description = "There is nothing to display right now.",
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <section
      role="status"
      className={`flex min-w-0 flex-col items-center justify-center rounded-2xl px-5 py-12 text-center ${className}`}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-brand-600">
        <Icon size={26} aria-hidden="true" />
      </span>

      <h3 className="mt-5 max-w-full break-words text-base font-bold text-ink-950">
        {title}
      </h3>

      <p className="mt-2 max-w-sm break-words text-sm leading-6 text-ink-500">
        {description}
      </p>

      {actionLabel && typeof onAction === "function" && (
        <Button
          className="mt-5"
          onClick={onAction}
          leftIcon={<Plus size={16} aria-hidden="true" />}
        >
          {actionLabel}
        </Button>
      )}
    </section>
  );
}
