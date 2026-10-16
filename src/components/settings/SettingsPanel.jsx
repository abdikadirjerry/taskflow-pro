import { CheckCircle2, RotateCcw, Settings2, UserRound } from "lucide-react";
import Button from "../ui/Button";
import { DEFAULT_SETTINGS } from "../../hooks/usePersistentSettings";

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-ink-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10";

function PreferenceCard({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <h3 className="text-sm font-bold text-ink-950">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-ink-500">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function SettingsPanel({ settings, onChange, onReset }) {
  function updateSetting(name, value) {
    onChange((current) => ({
      ...current,
      [name]: value,
    }));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
          <Settings2 size={21} />
        </span>

        <div>
          <h2 className="font-bold text-ink-950">Personalize your workspace</h2>
          <p className="mt-1 text-sm leading-6 text-ink-500">
            Your preferences are saved automatically in this browser.
          </p>
        </div>
      </div>

      <PreferenceCard
        title="Profile"
        description="Choose the name displayed in your workspace."
      >
        <label
          htmlFor="settings-display-name"
          className="flex items-center gap-2 text-xs font-bold text-ink-600"
        >
          <UserRound size={15} />
          Display name
        </label>

        <input
          id="settings-display-name"
          type="text"
          maxLength={40}
          value={settings.displayName}
          onChange={(event) => updateSetting("displayName", event.target.value)}
          placeholder="Enter your name"
          className={fieldClass}
        />
      </PreferenceCard>

      <PreferenceCard
        title="Workspace behavior"
        description="Choose how TaskFlow should organize your workspace."
      >
        <div>
          <label
            htmlFor="settings-default-view"
            className="text-xs font-bold text-ink-600"
          >
            Default page
          </label>

          <select
            id="settings-default-view"
            value={settings.defaultView}
            onChange={(event) =>
              updateSetting("defaultView", event.target.value)
            }
            className={fieldClass}
          >
            <option value="Overview">Overview dashboard</option>
            <option value="All Tasks">All tasks</option>
            <option value="Today">Today's tasks</option>
            <option value="Upcoming">Upcoming tasks</option>
          </select>
          <p className="mt-2 text-xs text-ink-500">
            This page will open when you next load the app.
          </p>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4 border-t border-line pt-5">
          <div>
            <p className="text-sm font-semibold text-ink-800">
              Show completed tasks
            </p>
            <p className="mt-1 text-xs leading-5 text-ink-500">
              When disabled, completed tasks are hidden from task lists.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.showCompletedTasks}
            aria-label="Show completed tasks"
            onClick={() =>
              updateSetting("showCompletedTasks", !settings.showCompletedTasks)
            }
            className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 ${
              settings.showCompletedTasks ? "bg-brand-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${
                settings.showCompletedTasks
                  ? "translate-x-5"
                  : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="mt-5 border-t border-line pt-5">
          <label
            htmlFor="settings-week-start"
            className="text-xs font-bold text-ink-600"
          >
            First day of the week
          </label>

          <select
            id="settings-week-start"
            value={settings.weekStartsOn}
            onChange={(event) =>
              updateSetting("weekStartsOn", event.target.value)
            }
            className={fieldClass}
          >
            <option value="monday">Monday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>
      </PreferenceCard>

      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-ink-950">Reset preferences</h3>
          <p className="mt-1 text-xs text-ink-500">
            Restore the original settings without deleting your tasks.
          </p>
        </div>

        <Button
          variant="outline"
          leftIcon={<RotateCcw size={15} />}
          onClick={onReset}
        >
          Reset settings
        </Button>
      </div>

      <p className="flex items-center gap-2 text-xs text-emerald-700">
        <CheckCircle2 size={15} />
        Preferences save automatically.
      </p>
    </div>
  );
}

export { DEFAULT_SETTINGS };
