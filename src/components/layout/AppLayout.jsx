import { useState } from "react";
import { CalendarDays, Sparkles } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({
  children,
  onCreateTask,
  activePage,
  onNavigate,
  displayName = "there",
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleNavigate(page) {
    onNavigate(page);
    setSidebarOpen(false);
  }

  const pageDescription = {
    Overview: "A little progress each day adds up to big results.",
    "All Tasks": "Review and organize all your tasks in one place.",
    Today: "Focus on deadlines that need your attention today.",
    Upcoming: "Get ahead by reviewing your future deadlines.",
    Settings: "Customize your productivity workspace.",
    "Help & Support": "Find help using your TaskFlow workspace.",
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[264px]">
        <Header
          onMenuOpen={() => setSidebarOpen(true)}
          onCreateTask={onCreateTask}
        />

        <main className="mx-auto w-full max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-500">
                <CalendarDays size={14} />
                <span>Your productivity space</span>
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
                {activePage === "Overview"
                  ? `Good to see you${displayName.trim() ? `, ${displayName.trim()}` : ""}!`
                  : activePage}
              </h1>

              <p className="mt-2 text-sm leading-6 text-ink-500">
                {pageDescription[activePage] ??
                  "Manage your productivity workspace."}
              </p>
            </div>

            <div className="hidden items-center gap-2 self-start rounded-full border border-indigo-100 bg-white px-3 py-2 text-xs font-medium text-brand-700 shadow-sm sm:flex">
              <Sparkles size={15} />
              Your space to focus
            </div>
          </div>

          {children}
        </main>

        <footer className="px-4 pb-6 text-center text-xs text-slate-400 sm:px-6 lg:px-10">
          Made for better days. One task at a time.
        </footer>
      </div>
    </div>
  );
}
