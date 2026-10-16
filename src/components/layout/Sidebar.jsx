import {
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  LayoutDashboard,
  ListTodo,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

const navigationItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "All Tasks", icon: ListTodo },
  { label: "Today", icon: CalendarDays },
  { label: "Upcoming", icon: CheckCircle2 },
];

const secondaryItems = [
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: CircleHelp },
];

function NavigationLink({ item, activePage, onNavigate }) {
  const Icon = item.icon;
  const isActive = activePage === item.label;

  return (
    <button
      type="button"
      onClick={() => onNavigate(item.label)}
      aria-current={isActive ? "page" : undefined}
      className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition ${
        isActive
          ? "bg-brand-600 text-white shadow-lg shadow-indigo-200/60"
          : "text-ink-500 hover:bg-indigo-50 hover:text-brand-700"
      }`}
    >
      <Icon
        size={18}
        className={
          isActive
            ? "text-white"
            : "text-slate-400 transition group-hover:text-brand-600"
        }
      />
      <span>{item.label}</span>

      {isActive && <span className="ml-auto size-1.5 rounded-full bg-white" />}
    </button>
  );
}

export default function Sidebar({ activePage, onNavigate, open, onClose }) {
  function navigateTo(page) {
    onNavigate(page);
    onClose();
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-line bg-white px-5 py-6 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={() => navigateTo("Overview")}
            className="flex items-center gap-3 rounded-lg text-left"
            aria-label="TaskFlow Pro home"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-indigo-200">
              <CheckCircle2 size={23} strokeWidth={2.5} />
            </span>

            <span>
              <span className="block text-lg font-extrabold tracking-tight text-ink-950">
                TaskFlow<span className="text-brand-600">.</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">
                Pro workspace
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mt-10">
          <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>

          <nav aria-label="Main navigation" className="space-y-1.5">
            {navigationItems.map((item) => (
              <NavigationLink
                key={item.label}
                item={item}
                activePage={activePage}
                onNavigate={navigateTo}
              />
            ))}
          </nav>
        </div>

        <div className="mt-9">
          <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
            Preferences
          </p>

          <nav aria-label="Preferences navigation" className="space-y-1.5">
            {secondaryItems.map((item) => (
              <NavigationLink
                key={item.label}
                item={item}
                activePage={activePage}
                onNavigate={navigateTo}
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-4">
            <div className="absolute -right-5 -top-5 size-20 rounded-full bg-white/70" />

            <div className="relative">
              <span className="mb-3 flex size-9 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                <Sparkles size={17} />
              </span>

              <h3 className="text-sm font-bold text-ink-950">
                Make today count
              </h3>

              <p className="mt-1.5 text-xs leading-5 text-ink-500">
                Small steps every day create meaningful progress.
              </p>

              <button
                type="button"
                onClick={() => navigateTo("Today")}
                className="mt-3 text-xs font-bold text-brand-700 hover:text-brand-800"
              >
                View today's tasks →
              </button>
            </div>
          </div>

          <p className="mt-5 text-center text-[10px] font-medium text-slate-400">
            TaskFlow Pro · Stay focused
          </p>
        </div>
      </aside>
    </>
  );
}
