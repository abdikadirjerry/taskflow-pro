import {
  ArrowDownUp,
  ListFilter,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../utils/taskHelpers";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-xs font-medium text-ink-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10";

export default function TaskFilters({
  filters,
  onChange,
  onReset,
  resultCount,
  totalCount,
}) {
  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.category !== "all" ||
    filters.sort !== "newest";

  function updateFilter(name, value) {
    onChange((current) => ({
      ...current,
      [name]: value,
    }));
  }

  return (
    <section className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-ink-950">
              <SlidersHorizontal size={16} className="text-brand-600" />
              Find your tasks
            </h3>
            <p className="mt-1 text-xs text-ink-500">
              Search, narrow down, and organize your work.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
            <ListFilter size={13} />
            {resultCount} of {totalCount} tasks
          </span>
        </div>

        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search by task title or description..."
            aria-label="Search tasks"
            className={`${inputClass} py-3 pl-10 pr-4`}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="min-w-0">
            <span className="mb-1.5 block text-[11px] font-bold text-ink-600">
              Status
            </span>
            <select
              value={filters.status}
              onChange={(event) => updateFilter("status", event.target.value)}
              className={inputClass}
              aria-label="Filter by status"
            >
              <option value="all">All statuses</option>
              <option value={TASK_STATUSES.TODO}>To do</option>
              <option value={TASK_STATUSES.IN_PROGRESS}>In progress</option>
              <option value={TASK_STATUSES.COMPLETED}>Completed</option>
            </select>
          </label>

          <label className="min-w-0">
            <span className="mb-1.5 block text-[11px] font-bold text-ink-600">
              Priority
            </span>
            <select
              value={filters.priority}
              onChange={(event) => updateFilter("priority", event.target.value)}
              className={inputClass}
              aria-label="Filter by priority"
            >
              <option value="all">All priorities</option>
              <option value={TASK_PRIORITIES.HIGH}>High</option>
              <option value={TASK_PRIORITIES.MEDIUM}>Medium</option>
              <option value={TASK_PRIORITIES.LOW}>Low</option>
            </select>
          </label>

          <label className="min-w-0">
            <span className="mb-1.5 block text-[11px] font-bold text-ink-600">
              Category
            </span>
            <select
              value={filters.category}
              onChange={(event) => updateFilter("category", event.target.value)}
              className={inputClass}
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {TASK_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="min-w-0">
            <span className="mb-1.5 block text-[11px] font-bold text-ink-600">
              <span className="inline-flex items-center gap-1.5">
                <ArrowDownUp size={12} />
                Sort by
              </span>
            </span>
            <select
              value={filters.sort}
              onChange={(event) => updateFilter("sort", event.target.value)}
              className={inputClass}
              aria-label="Sort tasks"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="dueDate">Due date</option>
              <option value="priority">Highest priority</option>
              <option value="title">Title A–Z</option>
            </select>
          </label>
        </div>

        {hasActiveFilters && (
          <div className="flex justify-end border-t border-line pt-3">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-ink-500 transition hover:bg-canvas hover:text-brand-700"
            >
              <RotateCcw size={13} />
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
