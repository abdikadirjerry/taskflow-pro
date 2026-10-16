import { Bell, ChevronDown, Menu, Plus, Search } from "lucide-react";

export default function Header({ onMenuOpen, onCreateTask }) {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-line bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuOpen}
          aria-label="Open navigation"
          className="rounded-xl border border-line p-2.5 text-ink-600 transition hover:bg-canvas lg:hidden"
        >
          <Menu size={20} />
        </button>

        <label className="relative hidden w-full max-w-[380px] sm:block">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search tasks"
            className="h-11 w-full rounded-xl border border-line bg-canvas/70 pl-10 pr-14 text-sm text-ink-950 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            /
          </span>
        </label>

        <p className="truncate text-sm font-semibold text-ink-800 sm:hidden">
          TaskFlow Pro
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onCreateTask}
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-600 px-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-brand-700 active:scale-[0.98] sm:px-4"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New task</span>
          <span className="sm:hidden">New</span>
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-line p-2.5 text-ink-600 transition hover:bg-canvas"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-rose-500" />
        </button>

        <button
          type="button"
          aria-label="User profile"
          className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-0.5 transition hover:bg-canvas sm:pl-2 sm:pr-2"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
            JD
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-xs font-bold text-ink-950">
              John Doe
            </span>
            <span className="mt-0.5 block text-[10px] text-ink-500">
              Personal account
            </span>
          </span>
          <ChevronDown size={15} className="hidden text-ink-500 sm:block" />
        </button>
      </div>
    </header>
  );
}
