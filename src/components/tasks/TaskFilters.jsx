import { Filter, Search, SlidersHorizontal, X } from "lucide-react";

const fieldClass =
  "min-w-0 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10";

const labelClass = "mb-1.5 block text-xs font-semibold text-ink-600";

export default function TaskFilters({
  filters,
  onChange,
  onReset,
  resultCount,
  totalCount,
}) {
  function updateFilter(name, value) {
    onChange((current) => ({
      ...current,
      [name]: value,
    }));
  }

  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.category !== "all" ||
    filters.sort !== "newest";

  return (
    <section
      aria-label="Search and filter tasks"
      className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-50 text-brand-600">
              <SlidersHorizontal size={17} />
            </span>

            <div>
              <h2 className="text-sm font-bold text-ink-950">
                Find your tasks
              </h2>
              <p className="mt-0.5 text-xs text-ink-500">
                Search, narrow down, and organize your work.
              </p>
            </div>
          </div>

          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-xs font-medium text-ink-500"
          >
            Showing{" "}
            <span className="font-bold text-ink-800">{resultCount}</span> of{" "}
            <span className="font-bold text-ink-800">{totalCount}</span> tasks
          </p>
        </div>

        <div className="relative">
          <Search
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <label htmlFor="task-search" className="sr-only">
            Search tasks by title or description
          </label>

          <input
            id="task-search"
            type="search"
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search tasks by title or description..."
            className={`${fieldClass} pl-10 pr-10`}
          />

          {filters.search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => updateFilter("search", "")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="min-w-0">
            <label htmlFor="filter-status" className={labelClass}>
              Status
            </label>
            <select
              id="filter-status"
              value={filters.status}
              onChange={(event) => updateFilter("status", event.target.value)}
              className={fieldClass}
            >
              <option value="all">All statuses</option>
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="min-w-0">
            <label htmlFor="filter-priority" className={labelClass}>
              Priority
            </label>
            <select
              id="filter-priority"
              value={filters.priority}
              onChange={(event) => updateFilter("priority", event.target.value)}
              className={fieldClass}
            >
              <option value="all">All priorities</option>
              <option value="high">High priority</option>
              <option value="medium">Medium priority</option>
              <option value="low">Low priority</option>
            </select>
          </div>

          <div className="min-w-0">
            <label htmlFor="filter-category" className={labelClass}>
              Category
            </label>
            <select
              id="filter-category"
              value={filters.category}
              onChange={(event) => updateFilter("category", event.target.value)}
              className={fieldClass}
            >
              <option value="all">All categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Learning">Learning</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="min-w-0">
            <label htmlFor="filter-sort" className={labelClass}>
              Sort by
            </label>
            <select
              id="filter-sort"
              value={filters.sort}
              onChange={(event) => updateFilter("sort", event.target.value)}
              className={fieldClass}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="dueDate">Due date</option>
              <option value="priority">Priority</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-ink-500">
            <Filter size={14} aria-hidden="true" />
            Refine the list to focus on what matters.
          </p>

          <button
            type="button"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl px-3 py-2 text-xs font-bold text-brand-700 transition hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-transparent sm:self-auto"
          >
            <X size={14} aria-hidden="true" />
            Reset filters
          </button>
        </div>
      </div>
    </section>
  );
}
