import type { Settings } from '~/lib/storage'
import { XButton } from '../components/ui/x-button'

interface SettingsPanelProps {
  settings: Settings
  onChange: (settings: Settings) => void
  onClose: () => void
}

export function SettingsPanel({
  settings,
  onChange,
  onClose,
}: SettingsPanelProps) {
  return (
    <div className="space-y-3 border-t border-zinc-200 p-3 text-sm dark:border-zinc-700">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-medium text-zinc-800 dark:text-zinc-100">
          Settings
        </h2>
        <button
          aria-label="Close settings"
          className="flex size-7  border items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          type="button"
          onClick={onClose}
        >
          <XButton />
        </button>
      </div>
      <fieldset>
        <legend className="mb-1 font-medium text-zinc-800 dark:text-zinc-100">
          Emoji size
        </legend>
        <div className="flex gap-1">
          {(['s', 'm', 'l'] as const).map((size) => (
            <SizeButton
              key={size}
              active={settings.emojiSize === size}
              label={size.toUpperCase()}
              onClick={() => onChange({ ...settings, emojiSize: size })}
            />
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="mb-1 block font-medium text-zinc-800 dark:text-zinc-100">
          Recents to keep
        </span>
        <input
          className="w-24 rounded-md border border-zinc-200 bg-white px-2 py-1 dark:border-zinc-600 dark:bg-zinc-900"
          max={80}
          min={8}
          type="number"
          value={settings.recentsCount}
          onChange={(event) => {
            const recentsCount = clampCount(Number(event.target.value))
            onChange({
              ...settings,
              recentsCount,
              recents: settings.recents.slice(0, recentsCount),
            })
          }}
        />
      </label>
      <p className="text-xs text-zinc-500">
        Shortcut: Ctrl/⌘ + Shift + E. Paste may show a box if the OS does not
        include that emoji yet.
      </p>
    </div>
  )
}

function clampCount(value: number): number {
  if (Number.isNaN(value)) {
    return 24
  }
  return Math.min(80, Math.max(8, Math.round(value)))
}

interface SizeButtonProps {
  active: boolean
  label: string
  onClick: () => void
}

function SizeButton({ active, label, onClick }: SizeButtonProps) {
  return (
    <button
      className={`rounded-md px-2 py-1 ${
        active
          ? 'bg-amber-100 font-medium ring-1 ring-amber-400 dark:bg-amber-950'
          : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
