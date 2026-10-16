import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  ListTodo,
  Settings2,
  Sparkles,
  Target,
  X,
} from "lucide-react";

const navigation = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "All Tasks", icon: ListTodo, count: "12" },
      { label: "Today", icon: CalendarDays },
      { label: "Upcoming", icon: Target },
    ],
  },
];

export default function Sidebar({ activePage, onNavigate, open, onClose }) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-line bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[84px] items-center justify-between border-b border-line px-6">
          <button
            type="button"
            onClick={() => onNavigate("Overview")}
            className="flex items-center gap-3 text-left"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-indigo-200">
              <CheckCircle2 size={23} strokeWidth={2.5} />
            </span>
            <span>
              <span className="block text-[17px] font-extrabold tracking-tight text-ink-950">
                TaskFlow<span className="text-brand-600">.</span>
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.19em] text-ink-500">
                Pro workspace
              </span>
            </span>
          </button>

          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-500 hover:bg-canvas lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-4 pt-6">
          <button
            type="button"
            onClick={() => onNavigate("Overview")}
            className="flex w-full items-center justify-between rounded-xl border border-line px-3 py-3 text-left transition hover:bg-canvas"
          >
            <span className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Sparkles size={17} />
              </span>
              <span className="text-sm font-semibold text-ink-800">
                My workspace
              </span>
            </span>
            <ChevronDown size={16} className="text-ink-500" />
          </button>
        </div>

        <nav
          aria-label="Main navigation"
          className="flex-1 overflow-y-auto px-4 py-7"
        >
          {navigation.map((group) => (
            <div key={group.title} className="mb-7">
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.16em] text-slate-400">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.label;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => onNavigate(item.label)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-600 hover:bg-canvas hover:text-ink-950"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
                        {item.label}
                      </span>

                      {item.count && (
                        <span
                          className={`rounded-md px-2 py-0.5 text-xs ${
                            isActive
                              ? "bg-white text-brand-700"
                              : "bg-slate-100 text-ink-500"
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div>
            <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.16em] text-slate-400">
              PREFERENCES
            </p>
            <button
              type="button"
              onClick={() => onNavigate("Settings")}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                activePage === "Settings"
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-600 hover:bg-canvas hover:text-ink-950"
              }`}
            >
              <Settings2 size={19} />
              Settings
            </button>
            <button
              type="button"
              onClick={() => onNavigate("Help & Support")}
              className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                activePage === "Help & Support"
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-600 hover:bg-canvas hover:text-ink-950"
              }`}
            >
              <CircleHelp size={19} />
              Help & Support
            </button>
          </div>
        </nav>

        <div className="border-t border-line p-4">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-violet-50 to-white p-4">
            <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
              <Target size={19} />
            </div>
            <p className="text-sm font-bold text-ink-950">Make today count</p>
            <p className="mt-1 text-xs leading-5 text-ink-500">
              Small steps every day lead to big results.
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-indigo-100">
              <div className="h-full w-[35%] rounded-full bg-brand-600" />
            </div>
            <p className="mt-2 text-[10px] font-medium text-ink-500">
              Your journey starts here
            </p>
          </div>

          <p className="mt-4 text-center text-[10px] text-slate-400">
            TASKFLOW PRO · VERSION 1.0
          </p>
        </div>
      </aside>
    </>
  );
}
