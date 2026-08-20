import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import {
  applySkinTone,
  catalog,
  categories,
  emojisForCategory,
  resolveRecents,
  searchCatalog,
  type CatalogEmoji,
  type Category,
} from '~/features/emoji/catalog'
import { CategoryRail } from '~/features/picker/category-rail'
import { ComposeBar } from '~/features/picker/compose-bar'
import { EmojiGrid } from '~/features/picker/emoji-grid'
import { SearchBar } from '~/features/picker/search-bar'
import { SkinToneControl } from '~/features/picker/skin-tone-control'
import { SettingsPanel } from '~/features/settings/settings-panel'
import { INSERT_EMOJI, type InsertEmojiResponse } from '~/lib/messages'
import {
  DEFAULT_SETTINGS,
  loadSettings,
  recordRecent,
  saveSettings,
  type Settings,
} from '~/lib/storage'

type ToastKind = 'copied' | 'inserted' | 'copied-only'

function toastLabel(kind: ToastKind): string {
  if (kind === 'inserted') {
    return 'Inserted'
  }
  if (kind === 'copied-only') {
    return 'Copied (no text field)'
  }
  return 'Copied'
}

function previewText(emoji: CatalogEmoji): string {
  return `${emoji.label} (${emoji.hexcode.toLowerCase()})`
}

export function App() {
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState<Category['id']>('smileys-emotion')
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selection, setSelection] = useState('')
  const [preview, setPreview] = useState<CatalogEmoji | null>(null)
  const [toast, setToast] = useState<ToastKind | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void loadSettings().then((loaded) => {
      setSettings(loaded)
      if (loaded.recents.length > 0) {
        setCategoryId('recents')
      }
      setReady(true)
    })
  }, [])

  useEffect(() => {
    if (!ready) {
      return
    }
    void saveSettings(settings)
  }, [ready, settings])

  const items = useMemo(() => {
    const trimmed = query.trim()
    if (trimmed) {
      return searchCatalog(trimmed)
    }
    if (categoryId === 'recents') {
      return resolveRecents(settings.recents)
    }
    return emojisForCategory(categoryId)
  }, [categoryId, query, settings.recents])

  function handlePick(item: CatalogEmoji) {
    const glyph = applySkinTone(item, settings.skinTone)
    setSelection((current) => current + glyph)
    setSettings((current) => recordRecent(current, item.hexcode))
    setToast(null)
  }

  async function handleCopy() {
    if (!selection) {
      return
    }

    try {
      await navigator.clipboard.writeText(selection)
    } catch {
      // Clipboard can fail; still try insert.
    }

    let inserted = false
    try {
      const response = (await chrome.runtime.sendMessage({
        type: INSERT_EMOJI,
        emoji: selection,
      })) as InsertEmojiResponse | undefined
      inserted = Boolean(response?.inserted)
    } catch {
      inserted = false
    }

    setToast(inserted ? 'inserted' : 'copied-only')

    window.setTimeout(() => {
      window.close()
    }, 280)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      if (query) {
        setQuery('')
        return
      }
      if (selection) {
        setSelection('')
        return
      }
      window.close()
      return
    }

    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey) && selection) {
      event.preventDefault()
      void handleCopy()
      return
    }

    if (event.key === 'Enter' && items[0] && !event.metaKey && !event.ctrlKey) {
      event.preventDefault()
      handlePick(items[0])
    }
  }

  return (
    <div
      className="flex size-full flex-col overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
      onKeyDown={handleKeyDown}
    >
      <header className="flex items-center justify-between px-3 pt-2 pb-1">
        <h1 className="text-sm font-semibold tracking-tight">Remojis</h1>
        <span className="text-[11px] text-zinc-400">
          {catalog.length} emoji
        </span>
      </header>
      <SearchBar inputRef={searchRef} value={query} onChange={setQuery} />
      {!query.trim() && (
        <CategoryRail
          activeId={categoryId}
          categories={categories}
          onSelect={setCategoryId}
        />
      )}
      {query.trim() && (
        <p className="border-b border-zinc-200 px-3 py-1 text-xs text-zinc-500 dark:border-zinc-700">
          {items.length} result{items.length === 1 ? '' : 's'}
        </p>
      )}
      {categoryId === 'recents' && !query.trim() && items.length === 0 && (
        <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-zinc-500">
          Recently used emoji will show up here.
        </div>
      )}
      {!(categoryId === 'recents' && !query.trim() && items.length === 0) && (
        <EmojiGrid
          items={items}
          settings={settings}
          onPick={handlePick}
          onPreview={setPreview}
        />
      )}
      {settingsOpen && (
        <SettingsPanel
          settings={settings}
          onChange={setSettings}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      <div className="flex items-center justify-between border-t border-zinc-200 px-2 py-1.5 dark:border-zinc-700">
        <SkinToneControl
          value={settings.skinTone}
          onChange={(skinTone) =>
            setSettings((current) => ({ ...current, skinTone }))
          }
        />
        <button
          aria-expanded={settingsOpen}
          className="rounded-md px-2 py-1 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
          type="button"
          onClick={() => setSettingsOpen((open) => !open)}
        >
          Settings
        </button>
      </div>
      <ComposeBar
        previewLabel={preview ? previewText(preview) : null}
        selection={selection}
        toast={toast ? toastLabel(toast) : null}
        onClear={() => {
          setSelection('');
          setToast(null);
        }}
        onCopy={() => {
          void handleCopy()
        }}
      />
    </div>
  )
}
