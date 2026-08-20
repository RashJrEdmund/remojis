import { XButton } from "../components/ui/x-button"

interface ComposeBarProps {
  selection: string
  setSelection: (selection: string) => void
  previewLabel: string | null
  toast: string | null
  onClear: () => void
  onCopy: () => void
}

export function ComposeBar({
  selection,
  setSelection,
  previewLabel,
  toast,
  onClear,
  onCopy,
}: ComposeBarProps) {
  const hasSelection = selection.length > 0

  return (
    <div className="border-t border-zinc-200 px-2 pt-1.5 pb-2 dark:border-zinc-700">
      <div className="mb-1.5 flex min-h-4 items-center justify-between gap-2 px-0.5">
        <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
          {previewLabel ?? (hasSelection ? 'Click Copy to finish' : 'Click emoji to add')}
        </p>
        {toast ? (
          <span className="shrink-0 text-[11px] text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-transparent rounded px-2 py-0.5">
            {toast}
          </span>
        ) : null}
      </div>
      <form
        className="flex items-stretch gap-1.5"
        data-remojis-compose=""
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onCopy()
        }}
      >
        <div className="relative flex min-h-9 min-w-0 flex-1 items-center rounded-md border border-zinc-200 bg-zinc-50 px-2 dark:border-zinc-600 dark:bg-zinc-900">
          <input
            aria-live="polite"
            className={`min-h-9 min-w-0 flex-1 bg-transparent text-2xl leading-none outline-none ${hasSelection
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-400'
              }`}
            placeholder="…"
            value={selection}
            onChange={(event) => setSelection(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.stopPropagation()
              }
            }}
          />
          {hasSelection && (
            <button
              aria-label="Clear selection"
              className="ml-1 flex size-6 shrink-0 items-center justify-center rounded text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
              type="button"
              onClick={onClear}
            >
              <XButton />
            </button>
          )}
        </div>
        <button
          className="shrink-0 rounded-md bg-amber-500 px-3 text-xs font-semibold tracking-wide text-white uppercase enabled:hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!hasSelection}
          type="submit"
        >
          Copy
        </button>
      </form>
    </div>
  )
}
