export default function PageSection({
  title,
  description,
  action,
  eyebrow,
  className = "",
  children,
}) {
  return (
    <section className={`min-w-0 ${className}`}>
      {(title || description || action || eyebrow) && (
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0">
            {eyebrow && (
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">
                {eyebrow}
              </p>
            )}

            {title && (
              <h2 className="text-base font-bold tracking-tight text-ink-950 sm:text-lg">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1.5 text-sm leading-6 text-ink-500">
                {description}
              </p>
            )}
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {children}
    </section>
  );
}
