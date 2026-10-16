import { LoaderCircle } from "lucide-react";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-sm shadow-indigo-200/60 hover:bg-brand-700 active:bg-brand-700",
  secondary:
    "border border-line bg-white text-ink-800 shadow-sm hover:bg-slate-50",
  outline:
    "border border-brand-200 bg-transparent text-brand-700 hover:bg-brand-50",
  ghost: "bg-transparent text-ink-600 hover:bg-slate-100 hover:text-ink-950",
  danger: "bg-rose-600 text-white shadow-sm hover:bg-rose-700",
};

const sizes = {
  sm: "min-h-9 gap-1.5 rounded-lg px-3 text-xs",
  md: "min-h-11 gap-2 rounded-xl px-4 text-sm",
  lg: "min-h-12 gap-2.5 rounded-xl px-5 text-sm",
  icon: "size-10 rounded-xl p-0",
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
      className={`inline-flex shrink-0 items-center justify-center font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 disabled:pointer-events-none disabled:opacity-50 ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
    >
      {loading ? (
        <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
      ) : (
        leftIcon
      )}

      {children}

      {!loading && rightIcon}
    </button>
  );
}
