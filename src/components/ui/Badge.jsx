const variants = {
  default: "border-slate-200 bg-slate-100 text-slate-600",
  primary: "border-indigo-100 bg-indigo-50 text-indigo-700",
  success: "border-emerald-100 bg-emerald-50 text-emerald-700",
  warning: "border-amber-100 bg-amber-50 text-amber-700",
  danger: "border-rose-100 bg-rose-50 text-rose-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  outline: "border-line bg-white text-ink-600",
};

const sizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border font-semibold leading-4 ${variants[variant] ?? variants.default} ${sizes[size] ?? sizes.md} ${className}`}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={`size-1.5 shrink-0 rounded-full ${
            variant === "success"
              ? "bg-emerald-500"
              : variant === "warning"
                ? "bg-amber-500"
                : variant === "danger"
                  ? "bg-rose-500"
                  : variant === "violet"
                    ? "bg-violet-500"
                    : variant === "primary"
                      ? "bg-indigo-500"
                      : "bg-slate-400"
          }`}
        />
      )}

      {children}
    </span>
  );
}
