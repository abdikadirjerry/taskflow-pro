import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}) {
  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        className={`relative my-auto max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-white/60 bg-white shadow-floating ${sizes[size] ?? sizes.md}`}
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white/95 px-5 py-5 backdrop-blur sm:px-7">
          <div className="min-w-0">
            <h2
              id="modal-title"
              className="text-lg font-bold tracking-tight text-ink-950"
            >
              {title}
            </h2>

            {description && (
              <p
                id="modal-description"
                className="mt-1.5 text-sm leading-6 text-ink-500"
              >
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="shrink-0 rounded-xl border border-line p-2 text-ink-500 transition hover:bg-canvas hover:text-ink-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20"
          >
            <X size={18} />
          </button>
        </header>

        <div className="p-5 sm:p-7">{children}</div>
      </section>
    </div>
  );
}
