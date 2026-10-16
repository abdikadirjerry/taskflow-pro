import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-700",
  secondary:
    "border border-slate-200 bg-white text-ink-800 shadow-sm hover:bg-slate-50 active:bg-slate-100",
  outline:
    "border border-line bg-transparent text-ink-700 hover:border-brand-200 hover:bg-indigo-50 hover:text-brand-700",
  ghost: "text-ink-600 hover:bg-slate-100 hover:text-ink-950",
  danger:
    "bg-rose-600 text-white shadow-sm hover:bg-rose-700 active:bg-rose-800",
};

const sizes = {
  sm: "min-h-9 gap-1.5 rounded-lg px-3 py-2 text-xs",
  md: "min-h-11 gap-2 rounded-xl px-4 py-2.5 text-sm",
  lg: "min-h-12 gap-2 rounded-xl px-5 py-3 text-sm",
  icon: "size-11 rounded-xl p-0",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center justify-center font-semibold transition duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25 focus-visible:ring-offset-2 active:scale-[0.99] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
    >
      {loading ? (
        <Loader2 size={16} aria-hidden="true" className="animate-spin" />
      ) : (
        leftIcon
      )}

      {children}

      {!loading && rightIcon}
    </button>
  );
}
